<script lang="ts">
	import type { DagDBSvelte } from "../dagdb.svelte";
	import Mermaid from "../Mermaid.svelte";


  let {db} : {db: DagDBSvelte} = $props()

  let tables = $derived.by(() => {
    const { tbs } = db;
    return tbs;
  })

  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
</script>

{#each Object.entries(tables) as [key, value]}
{#await db.jsData(key)}
  Loading {key}...
  {:then data}
      {@render simpleTable(data, key) }
  {/await}
{/each}


<Mermaid code={db.mermaid} {db} />


{#snippet simpleTable(data: Record<string, any>[], name, limit=20)}
  <details open>
    <summary>{name}</summary>
    <div class="table">
        <div class="header">
          {#each Object.keys(data[0]) as key}
            <div class="cell">{key}</div>
          {/each}
        </div>
        {#each data.slice(0, limit) as row}
          <div class="row">
            {#each Object.values(row) as value}
              <div class="cell">{value}</div>
            {/each}
          </div>
        {/each}
      </div>
  </details>
{/snippet}

<style>
  details summary {
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 5px;
    margin-left: 5px;
  }

  .table {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .header {
    display: flex;
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  .row {
    display: flex;
  }
  
  .cell {
    flex: 1;
    padding: 8px;
    border-right: 1px solid #ccc;
  }
  
  .cell:last-child {
    border-right: none;
  }
</style>