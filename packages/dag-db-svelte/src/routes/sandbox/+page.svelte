<script lang="ts">
  import Database from './Database.svelte';
  import CodeMirror from "svelte-codemirror-editor";
  import { sql } from "@codemirror/lang-sql";

  import { browser } from '$app/environment'; 

	import { DagDBSvelte } from '../dagdb.svelte';

  const defaultSql = `
  CREATE TABLE names AS
      --SELECT * FROM 'https://data.cityofnewyork.us/api/views/25th-nujf/rows.csv';
      SELECT DISTINCT(*) FROM 'http://localhost:5173/rows.csv';

  CREATE TABLE totals AS 
     SELECT lower("Child's First Name") AS name,
     "Year of Birth" as year,
     SUM(Count) as count
     from names
  GROUP BY ALL;

  CREATE TABLE annual_totals as
    SELECT year, SUM(count) as count
    FROM totals GROUP BY all;

  CREATE TABLE year_over_year AS
    SELECT t1.name as name, 
           t2.year as year,
           t1.count previous_count,
           t2.count count,
           t2.count / t1.count AS change
    FROM totals t1 JOIN totals t2 
       ON (t1.name = t2.name AND t1.year = t2.year - 1)
    WHERE t1.count > 20
    ORDER BY change ASC;
  `

  let definition = $state(defaultSql)

  let tempSql = $state(defaultSql);


  let dbPromise: Promise<DagDBSvelte> = $state(new Promise(() => {}));
  if (browser) {
    dbPromise = DagDBSvelte.create(defaultSql, {param_1: 1, param_2: 2})
  }

  async function updateSql() {
    if (definition !== tempSql) {
      const db = await dbPromise;
      definition = tempSql;
      db.setSQL(definition);
    }
  }

</script>

<div class="codebox">
  <CodeMirror bind:value={tempSql} lang={sql()} />
</div>

<button disabled={definition === tempSql}
 onclick={updateSql}>Run</button>

{#if browser}
  {#await dbPromise}
    Loading...
  {:then db} 
    <Database {db} />
  {/await}
{/if}

<style>
  
  .codebox { 
    margin: 1em;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: monospace;
    max-width: 60em;
  }

  button {
    margin: 1em;
  }

</style>