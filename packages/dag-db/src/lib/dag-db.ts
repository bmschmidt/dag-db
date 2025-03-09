import type { AsyncDuckDB, AsyncDuckDBConnection } from "@duckdb/duckdb-wasm";
import type { ParseRelation } from "./parseSql";
import { instantiateDuckDb } from "./init-duckdb";
import { parseSQL } from "./parseSql.js";
import { topologicalSort } from "./topological-sort";

export type LoadedDagDB = DagDB & {db: AsyncDuckDB, _con: AsyncDuckDBConnection};

export type ValidParametersBase = string | number | Date | boolean | null;
export type ValidParameters = ValidParametersBase | ValidParametersBase[] | Record<string, ValidParametersBase>;
export class DagDB {
  // The query passed in.
  #sql: string;
  protected _dbPromise: Promise<AsyncDuckDB>;
  protected db?: AsyncDuckDB;
  protected _con?: AsyncDuckDBConnection;
  protected loadedTables: Map<string, DagTable> = new Map();
  protected sortedRels: ParseRelation[] = [];
  protected _params: Record<string, ValidParameters> = {};
  protected _rels: Record<string, ParseRelation> = {};

  /**
   * 
   * @param sql SQL at creation time.
   * @param params SQL variables.
   */
  constructor(sql: string, params: Record<string, ValidParameters>) {
    // Should not be called directly.
    this.#sql = sql;
    this._dbPromise = instantiateDuckDb();
    this._params = params
  }

  static async create(sql: string, params: Record<string, ValidParameters> = {}) {
    const db = new DagDB(sql, params);
    await db.initialPrep();
    return db as LoadedDagDB;
  }

  // Shows the SQL used to instantiate the db.
  get sql() {
    return this.#sql;
  }

  async initialPrep() {
    this.db = await this._dbPromise;
    const con = await this.db.connect();
    this._con = con;
    await this.setSQL(this.#sql);
    // Build up a list of tables.
  }


  /**
   * 
   * @param key the name of the table to get
   * @returns The wrapper DagTable object that manages the underlying database table
   * 
   * Note -- if this is run immediately following a setParams or setSQL without
   * waiting for it to resolve, an old version of the table may be retrieved.
   */
  getTable(key: string) : DagTable {
    if (this.validTables.has(key)) {
      return this.validTables.get(key)!;
    } else {
      this.createTable(key);
      const v = this.validTables.get(key)!;
      if (!v) {
        throw new Error(`Table ${key} not created.`);
      }
      return v;
    }
  }
  

  /**
   * Returns a string representation of the dag as a mermaid flowchart.
   */

  get mermaid() {
    const lines = [];
    lines.push("\nflowchart LR");

    lines.push('  classDef className fill:#f9f,stroke:#333,stroke-width:4px;')
    const ids : string[] = [];
    for (const param of Object.keys(this._params)) {
      ids.push(param)
      lines.push(`  p_${ids.indexOf(param)}@{ shape: lean-r, label: "${param}" }`);
    }
    for (const rel of this.sortedRels) {
      ids.push(rel.tableName);
      if (rel.createType === 'MACRO') {
        lines.push(`  t_${ids.indexOf(rel.tableName)}@{ shape: fr-rect, label: "${rel.tableName}" }`);
      } else {
        if (rel.createType === 'VIEW') {
          lines.push(`  t_${ids.indexOf(rel.tableName)}@{ shape: bow-rect, label: "${rel.tableName}" }`);
        } else {
          lines.push(`  t_${ids.indexOf(rel.tableName)}@{ shape: rect, label: "${rel.tableName}" }`);
        }
      }
      for (const parent of rel.requires || []) {
        lines.push(`  t_${ids.indexOf(parent)} --> t_${ids.indexOf(rel.tableName)}`);
      }
      for (const param of rel.params || []) {
        lines.push(`  p_${ids.indexOf(param)} --> t_${ids.indexOf(rel.tableName)}`);
      }
    }
    return lines.join("\n");
  }

  private validTables = new Map<string, DagTable>();

  /**
   * 
   * @param key 
   */
  invalidationCallback(key: string) {
    void key;
    // Override this to do something after the table is invalidated.
  }

  completionCallback(key: string, value: DagTable) {
    void key;
    void value;
    // Override this to do something after the table is loaded
  }

  // Builds a table if it doesn't exist, .
  private createTable(key: string) {
    let tb : DagTable;
    if (this.validTables.has(key)) {
      // There is already a valid version building.
      return;
    }
    if (key.endsWith('.parquet') || key.endsWith('.csv')) {
      tb = new RemoteDagTable(key, this);
      console.log("REMOTE", tb, key)
    } else {
      const rel = this._rels[key];
      if (!rel) {      
        throw new Error(`Table ${key} not found.`);
      }
      const parents : Record<string, DagTable> = {};
      for (const parent of rel.requires || []) {
        parents[parent] = this.getTable(parent);
      }

      tb = new DagTable({
        query: rel.query,
        paramNames: rel.params,
        params: Object.fromEntries(rel.params.map(k => [k, this._params[k]])),
        parents,
        dag: this,
        name: key,
      });
    }
    this.validTables.set(key, tb);
    // Once it's instantiated, start the async process of making the table.
    tb.loadTable().catch((e) => {
      console.error("Error making table", key, e);
      console.error(tb.query)
      throw e;
    })
    .then(() => {
      this.loadedTables.set(key, tb);
      this.completionCallback(key, tb);
    })
  }

  times : Record<string, number> = {};

  setParams(vals : Record<string, ValidParameters>) {

    // First, update the parameters on the object.
    for (const [key, value] of Object.entries(vals)) {
      this._params[key] = value;
    }

    // Invalidation step.
    for (const {tableName} of this.sortedRels) {
      const table = this.validTables.get(tableName);
      if (!table) {
        continue;
      }

      // If the existing table has different parameters, invalidate it.
      for (const k of table.paramNames) {
        if (vals[k] !== undefined && vals[k] !== table.params[k]) {
          setTimeout(() => this.invalidationCallback(tableName), 1);
          this.validTables.delete(tableName);
          this.loadedTables.delete(tableName);
          break;
        }
      }
      // If any of the parents are invalid, potentially from an 
      // early param invalidation, invalidate this table.
      for (const parent of (Object.keys(table.parents))) {
        if (!this.validTables.has(parent)) {
          setTimeout(() => this.invalidationCallback(tableName), 1);
          this.validTables.delete(tableName);
          this.loadedTables.delete(tableName);
          break;
        }
      }
    }

    // Creation step.
    for (const { tableName, createType } of this.sortedRels) {
      if (createType === 'MACRO') {
        continue;
      }
      if (!this.validTables.has(tableName)) {
        this.createTable(tableName)
      }
    }
  }

  async setSQL(sql: string) {
    this.db = await this._dbPromise;
    const con = await this.db.connect();
    this._con = con;
    const tbs = await parseSQL(sql, con);

    // First -- run any macros.
    for (const rel of tbs) {
      console.log({rel})
      if (rel.createType === 'MACRO') {
        try {
          await con.query(rel.original);
        } catch (e) {
          console.error("Error creating macro", rel.tableName, e);
          throw e;
        }
      }
    }

    // next: sort the tables.
    this.sortedRels = [...topologicalSort(tbs)]
    // Build up a list of tables.
    for (const rel of this.sortedRels) {
      this._rels[rel.tableName] = rel;
    }

    // next -- invalidate any tables that have SQL instantiation
    // code that has changed since the last time.
    for (const { tableName, createType, requires } of this.sortedRels) {
      if (createType === 'MACRO') {
        // Macros are handled separately.
        continue;
      }
      let invalidate = false;
      if (this.validTables.has(tableName)) {        
        const tb = this.validTables.get(tableName)!;
        if (tb.query !== this._rels[tableName].query) {
          invalidate = true;
        }
      }
      for (const parent of requires || []) {
        if (!this.validTables.has(parent)) {
          invalidate = true;
        }
      }
      if (invalidate) {
        this.invalidationCallback(tableName);
        // Hide the invalidation callback in a timeout to avoid
        // complaints from svelteKit. Yuck. Trying without.
        // setTimeout(() => this.invalidationCallback(tableName), 1);
        this.validTables.delete(tableName);
        this.loadedTables.delete(tableName);
    }
  }

    // Next, create any tables that don't exist. These will be 
    // dispatched in topological order and internally await their
    // parents.

    for (const { tableName, createType } of this.sortedRels) {
      if (!this.validTables.has(tableName) && createType !== 'MACRO') {
        console.log("CREATING", tableName)
        this.createTable(tableName)
      }
    }

    // Clean up any tables that are no longer in the SQL.
    // by deleting them.
    for (const [key, table] of this.validTables.entries()) {
      if (!this._rels[key]) {
        table.delete(con);
        this.validTables.delete(key);
        this.loadedTables.delete(key);
      }
    }
    return this;
  }
}

type TableParams = {
  query: string;
  paramNames: string[];
  params: Record<string, ValidParameters>;
  parents: Record<string, DagTable>;
  dag: DagDB;
  name: string;
}

export class DagTable {
  paramNames: string[];
  params: Record<string, ValidParameters>;
  query: string;
  parents: Record<string, DagTable>;
  dag: DagDB;
  name: string;
  created = false;

  constructor({query, paramNames, params, parents, dag, name} : TableParams) {
    this.query = query;
    this.paramNames = paramNames;
    this.params = params;
    this.parents = parents;
    this.dag = dag;
    this.name = name;
  }

  loadPromise?: Promise<DagTable>;


  delete(con: AsyncDuckDBConnection) {
    con.query(`DROP TABLE IF EXISTS "${this.name}"`);
  }

  // Runs the create query with the given parameters; 
  // stores the parents on the table for invalidation;
  // returns the table.
  async loadTable() : Promise<DagTable> {

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = new Promise((resolve, reject) => {

      const parents = Object.values(this.parents).map(p => p.loadTable());
      Promise.all(parents).then(
        async () => {
          this.created = true;
          const con = await this.dag._con;
          if (con === undefined) {
            throw new Error("Connection not established.");
          }
          this.dag.times[this.name] = (this.dag.times[this.name] || 0) + 1
          const stmt = await con.prepare(this.query);

          await stmt.query(...this.paramNames.map(k => {
            // TODO:
            // This handles json serialization for anything that is an object or array.
            // But it's kind of weird and secret! Maybe the deserialization
            // on the queries should also be secret somehow? E.g. maybe everything should
            // be serialized, and then all params deserialized in the query.
            if (this.params[k] instanceof Object || Array.isArray(this.params[k])) {
              return JSON.stringify(this.params[k]);
            }
            return this.params[k]
          }));
          resolve(this);
        })
      })
    return this.loadPromise;
  }

  get arrowData() {
    return this.dag._con!.query(`SELECT * FROM "${this.name}"`)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get jsData() : Promise<Record<string, any>[]> {
    return this.arrowData.then(d => [...d].map(d => ({...d})));
  }

  get array() {
    return this.arrowData.then(tb => tb.getChildAt(0)?.toArray());
  }

  // Assumes that the results of the query is a single scalar and 
  // returns that scalar.
  get scalar() {
    return this.array.then(a => a?.[0]);
  }

}

class RemoteDagTable extends DagTable {
  constructor(name: string, dag: DagDB) {
    super({
      query: '',
      paramNames: [],
      params: {},
      parents: {},
      dag,
      name,
    });
  }

  async loadTable() {
    if (this.name.startsWith('http') || this.name.startsWith('s3')) {
      return this
    }
    // If no protocol, we'll treat it as a local file.
    const buffer = fetch(this.name).then(fetched => fetched.arrayBuffer())
    const con = this.dag._con;

    if (con === undefined) {
      throw new Error("Connection not established.");
    }
    const db = await this.dag._dbPromise;
    await db.registerFileBuffer(this.name, new Uint8Array(buffer));
   
    // Dummy table to accomodate type system.
    // The query can't actually be run.

    const conn = await db.connect();
    const v = await conn.query(`SELECT * FROM "${key}"`).catch((e) => {
      console.error(e)
      throw e;
    })
    return this
  }
}