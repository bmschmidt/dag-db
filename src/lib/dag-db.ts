import type { AsyncDuckDB, AsyncDuckDBConnection } from "@duckdb/duckdb-wasm";
import type { ParseRelation } from "./parseSql";
import { instantiateDuckDb } from "./init-duckdb";
import { parseSQL } from "./parseSql.js";
import { parseDuckdbAst } from '$lib/parseAst.js';


type LoadedDagDB = DagDB & {db: AsyncDuckDB, _con: AsyncDuckDBConnection};

export class DagDB {
  sql: string;
  _dbPromise: Promise<AsyncDuckDB>;
  db?: AsyncDuckDB;
  _con?: AsyncDuckDBConnection;

  public parsed: ParseRelation[] = [];
  private tables: Record<string, Table> = {};
  private params: Record<string, any> = {};

  constructor(sql: string) {
    // Should not be called directly.
    this.sql = sql;
    this._dbPromise = instantiateDuckDb();
  }

  static async create(sql: string) {
    const db = new DagDB(sql);
    await db.initialPrep();
    return db as LoadedDagDB;
  }

  async initialPrep() {
    this.db = await this._dbPromise;
    const con = await this.db.connect();
    this._con = con;
    this.parsed = await parseSQL(this.sql, con);
  }

  param(key, value) {
    this.params[key] = value;
  }


}

type TableParams = {
  rel: ParseRelation;
  dag: DagDB;
}

class Table {
  dag: DagDB;
  rel: ParseRelation;
  dependencies: Table[] = [];

  constructor({dag, rel} : TableParams) {
    this.dag = dag;
    this.rel = rel;
  }
  async create() {
    const db = await this.dag._dbPromise;
    const con = await db.connect();
    this.dag._con = con;
    await con.query(this.rel.query);
    con.close();
  }
}