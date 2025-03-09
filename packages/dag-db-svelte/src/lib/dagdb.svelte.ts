import { DagDB, type LoadedDagDB} from 'dag-db';
import type { DagTable, ValidParameters } from 'dag-db';

export class DagDBSvelte extends DagDB {
  // Params are updated by users.

  // tbs 
  params: Record<string, ValidParameters> = $state({});
  tbs: Record<string, DagTable | undefined> = $state({});
  updated = $derived.by(() => {
    // I'm not sure how to specify an effect here, so instead 
    // I'm making a derived state that includes the resolution of the update.

    const { params } = this;
    this.setParams(params);
  })

  // Overwrite the base class methods to set delete the derived state on invalidation.
  invalidationCallback(key: string): void {
    this.tbs[key] = undefined;
  }

  // Overwrite the base class methods to set the derived state once the table exists.
  completionCallback(key: string, value: DagTable) {
    this.tbs[key] = value;
  }

  static async create(sql: string, params: Record<string, ValidParameters> = {}) {
    const db = new DagDBSvelte(sql, params);
    await db.initialPrep();
    db.params = params;
    return db as LoadedDagDB & DagDBSvelte;
  }

  /**
   * Return a promise that resolves to a representation of the named table as an arrow table.
   * 
   * @param tableName The name of the table.
   */
  arrow = $derived((tableName: string) => {
    const { updated } = this;
    void updated;
    return this.tbs[tableName]?.arrowData
  })
  /**
   * Return a promise that resolves to a representation of the named table as a list of native javascript objects.
   */
  jsData = $derived(
    (tableName: string) => {
      const { updated } = this;
      void updated;
      return this.tbs[tableName]?.jsData
    })
  /**
   * Return a promise that resolves the named table to a single javascript object (assuming that it's a one-cell table.).
   */
  scalar = $derived((tableName: string) => {
    const { updated } = this;
    void updated;
    return this.tbs[tableName]?.scalar
  })
  /**
   * Return a promise that resolves to a representation of the named table as a list of native javascript objects.
   * (Assuming the table has just one column.)
   */
  array = $derived((tableName: string) => {
    const { updated } = this;
    void updated;
    const { tbs } = this;
    return tbs[tableName]?.array
  }
  )
}