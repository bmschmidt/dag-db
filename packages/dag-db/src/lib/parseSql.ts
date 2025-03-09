/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AsyncDuckDBConnection } from '@duckdb/duckdb-wasm';
import { parseDuckdbAst } from './parseAst.js';

export type Op = 'SELECT' | 'CREATE' | 'UPDATE';

export type ParseRelation = {
  // The original sql query.
  original: string;
  // The actual sql query.
  query: string;
  // The table/view created by this query.
  tableName: string;
  createType: 'TABLE' | 'VIEW' | 'MACRO';
  // Any tables updated by this query.
  updates?: string[];
  // Any upstream tables read by this query that cause it to be recreated
  requires?: string[];
  // Any web resources that are downloaded by this query.
  loads?: string[];
  // Any sql parameters that are used in this query and will 
  // cause it to be recreated.
  params: string[];
  parsed?: Record<string, any>;
}

/**
 * 
 * @param sql a string consisting of one or more SQL statements that dag-sql can handle.
 * @param con A connection to a DuckDB database.
 * @returns 
 */
export async function parseSQL(sql: string, con: AsyncDuckDBConnection): Promise<ParseRelation[]> {
  const queries = splitSQLStatements(sql);

  const stmt = await con.prepare(`select json_serialize_sql(?::VARCHAR) AS json`);

  const all : ParseRelation[] = []

  for (const query of queries) {
    let creates = undefined;
    let select = query;
    let createType : 'TABLE' | 'VIEW' | 'MACRO' = 'VIEW';
    const q = query.replaceAll(/\s*--.*/g, '').trim();
    if (q.startsWith('CREATE')) {
      // TODO: can't capture tables with quotes in names.
      // TODO: can't capture macros with quotes in names.
      const match = q.match(/\s*CREATE\s+(OR\s+REPLACE\s+)*(?<createType>TABLE|VIEW|MACRO)\s+(?<tname>\w+|"[^"]+")\s+(AS|(\([^)]+\)\s+AS\s+TABLE))\s+?(?<select>[\s\S]*)/mi);
      if (match) {
        creates = match.groups!.tname;
        if (creates.startsWith('"')) {
          // Remove quotation marks from the outside.
          creates = creates.slice(1, -1);
        }

        createType = match.groups!.createType as 'TABLE' | 'VIEW' | 'MACRO';
        select = match.groups!.select;
      } else {
        throw new Error("Only CREATE TABLE AS SELECT is supported. " + "\n" + query);
      }
    } else if (q.startsWith("COMMENT ON")) {
      const match = q.match(/\s*COMMENT\s+ON\s+(?<createType>TABLE|VIEW|MACRO)\s+(?<tname>\w+|"[^"]+")\s+(IS\s+)'(?<comment>[\s\S]*')/mi);
      if (match) {
        continue;
      }
    } else if (q.startsWith("SET ")) {
      console.log("TRYING ", q);      
      await con.query(q);
      continue
    }
    else {
      throw new Error("Only COMMENT ON and CREATE {TABLE, VIEW, MACRO} AS SELECT is supported. " + "\n" + query);
    }
    let parsed : Record<string, any> = {};
    if (select) {
      parsed = JSON.parse(await stmt.query(select).then(d => d.get(0)!.json))
      if (parsed.error) {
        console.error(parsed, select);
        throw new Error(parsed.error);
      }
      if (parsed.statements.length > 1) {
        throw new Error("Only one statement per query is supported.");
      }
    }

    const {requires, params = [], loads} = parseDuckdbAst(parsed)

    const swapped = swapOutParameters(parsed, params);
    const remade = await remakeStatement(swapped, con);
    const createQuery = `CREATE OR REPLACE ${createType} "${creates}" AS ${remade}`;
    all.push({
      original: query,
      query: createType === 'MACRO' ? query : createQuery,
      // select: select,
      tableName: creates,
      createType,
      params,
      updates: [],
      loads,
      requires,
      parsed: swapped,
    });
  }
  return (all);
}

/**
 * 
 * @param parsed 
 * @param con 
 * @returns 
 */
async function remakeStatement(parsed: Record<string, any>, con: AsyncDuckDBConnection) {
  const stmnt = await con.prepare('SELECT json_deserialize_sql(?::JSON) query')
  const p = JSON.stringify(parsed, null, 2);  
  const q = await stmnt.query(p)
  return q.get(0)!.query
}

export function splitSQLStatements(sql: string): string[] {
  // Thank you chatGPT. This just gets out the CREATE TABLE
  // statement, which duckdb can't handle.
  const statements: string[] = [];
  let current: string[] = [];

  // Flags for states
  let inSingleQuote = false;
  let inDoubleQuote = false;   // optional if your dialect uses double-quoted strings
  let inLineComment = false;   // `-- comment`

  for (let i = 0; i < sql.length; i++) {
    const char = sql[i];
    const nextChar = i + 1 < sql.length ? sql[i + 1] : "";

    // --- Handle exiting line comment on newline
    if (inLineComment) {
      if (char === "\n") {
        inLineComment = false;
      }
      current.push(char);
      continue; 
    }

    // --- Handle toggling single quotes
    if (!inDoubleQuote && char === "'") {
      inSingleQuote = !inSingleQuote;
      current.push(char);
      continue;
    }

    // --- Handle toggling double quotes (if needed for your SQL variant)
    if (!inSingleQuote && char === '"') {
      inDoubleQuote = !inDoubleQuote;
      current.push(char);
      continue;
    }

    // --- If in a string, everything is literal except quote toggles
    if (inSingleQuote || inDoubleQuote) {
      current.push(char);
      continue;
    }

    // --- Check for line comment `--`
    if (char === "-" && nextChar === "-") {
      inLineComment = true;
      current.push(char);
      continue;
    }

    // --- Check for top-level semicolon
    if (char === ";") {
      // We found a statement terminator at top level.
      statements.push(current.join("").trim());
      current = [];
      continue;
    }

    // Otherwise, just add the character to `current`.
    current.push(char);
  }

  // Push the last chunk if any
  const remainder = current.join("").trim();
  if (remainder) {
    statements.push(remainder);
  }

  return statements;
}


/**
 * 
 * DuckDB uses positional parameters, so we need to replace the named parameters
 * with their numeric index.
 * 
 * @param parsed the duckdb AST of the query.
 * @param params A list of parameters that are used in the query.
 * @returns The AST with the parameters replaced by their numeric index.
 */
function swapOutParameters(parsed: Record<string, any>, params: string[]) : Record<string, any> {
  if (parsed === null || parsed === undefined) {
    return parsed;
  }
  if (parsed.query_location && parsed.query_location > 2**32) {
    parsed.query_location = undefined;
  }
  if (parsed.class === 'PARAMETER' && parsed.type === 'VALUE_PARAMETER') {
    // Replace the identifier with its numeric index.
    const id = parsed.identifier;
    return {
      ...parsed,
      query_location: undefined,
      identifier: String(params.indexOf(id) + 1)
    }
  }
  if (Array.isArray(parsed)) {
    return parsed.map(p => swapOutParameters(p, params));
  }
  if (typeof parsed === 'object') {
    const newObj : Record<string, any> = {};
    for (const [key, value] of Object.entries(parsed)) {
      newObj[key] = swapOutParameters(value, params);
    }
    return newObj;
  }
  return parsed;
}