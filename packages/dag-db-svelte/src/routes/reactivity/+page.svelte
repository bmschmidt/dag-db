<script lang="ts">
  import rawSql from "./test.sql?raw"
  import { browser } from '$app/environment'; 
  import DagDbPage from './dag-db.svelte'

  import { DagDBSvelte } from "$lib/dagdb.svelte.js";

  let editedSql = $state(rawSql);

  let newDB = $derived(
    browser ? DagDBSvelte.create(editedSql, { a: 1, b: 2}) : new Promise(() => {})
  )
</script>

This is an extremely basic test of the wiring. The SQL is below -- it is set up so that the addition of two numbers happens in duckdb.

<p>
  I'll probably remove this page soon.
</p>

See the <a href="https://bmschmidt.github.io/dag-db">main DagDB repo for a more complicated example using the dag-db-svelte library.</a>

<pre>
  <code>
    {rawSql}
  </code>
</pre>

<div>
  {#if browser}
    {#await newDB}
      Preparing…
    {:then db} 
      <DagDbPage {db} bind:a={db.params.a} bind:b={db.params.b}/>    
    {/await}
  {/if}
</div>