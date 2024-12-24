import type { AsyncDuckDBConnection } from '@duckdb/duckdb-wasm';
import { parseDuckdbAst } from './parseAst.js';

export type Op = 'SELECT' | 'CREATE' | 'UPDATE';

export type ParseRelation = {
  // The actual sql query.
  query: string;
  // Any tables created by this query.
  creates?: string;
  createType: 'TABLE' | 'VIEW'
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
    let createType : 'TABLE' | 'VIEW' = 'VIEW';
    if (query.startsWith('CREATE')) {
      // TODO: can't capture tables with quotes in names.
      const match = query.match(/CREATE\s+(OR\s+REPLACE\s+)*(?<createType>TABLE|VIEW)\s+(?<tname>\w+|"[^"]+")\s+(AS)\s+(?<select>[\s\S]*)/mi);
      if (match) {
        console.log({match})
        creates = match.groups!.tname;
        if (creates.startsWith('"')) {
          // Remove quotation marks from the outside.
          creates = creates.slice(1, -1);
        }
        createType = match.groups!.createType as 'TABLE' | 'VIEW';
        select = match.groups!.select;
      } else {
        throw new Error("Only CREATE TABLE AS SELECT is supported. " + "\n" + query);
      }
    } else {
      throw new Error("Only CREATE TABLE AS SELECT is supported. " + "\n" + query);
    }
    let parsed : Record<string, any> = {};
    if (select) {
      parsed = JSON.parse(await stmt.query(select).then(d => d.get(0)!.json))
      console.log({parsed})
      if (parsed.error) {
        throw new Error(parsed.error);
      }
      if (parsed.statements.length > 1) {
        throw new Error("Only one statement per query is supported.");
      }
    }

    const {requires, params = [], loads} = parseDuckdbAst(parsed)

    all.push({
      query: query,
      // select: select,
      creates: creates,
      createType,
      params,
      updates: [],
      loads,
      requires,
      parsed
    });
  }
  return (all);
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
