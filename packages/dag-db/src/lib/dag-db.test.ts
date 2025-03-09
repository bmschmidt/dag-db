import { describe, it, expect } from 'vitest';
import { DagDB } from './dag-db';
import test from './test.sql?raw'
import { instantiateDuckDb } from './init-duckdb';
describe('parseAst', async () => {
    it('duckdb wasm loads', async () => {
      const db = await instantiateDuckDb();
      expect(db).toBeDefined();      
      }, 100000);
});