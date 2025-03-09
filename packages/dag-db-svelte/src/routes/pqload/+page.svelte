<script lang="ts">
	import { onMount } from 'svelte';
	import sql from './parquet.sql?raw';
	import { DagDB, type LoadedDagDB } from 'dag-db';

	let db: LoadedDagDB | null = $state(null);

	onMount(async () => {
		db = await DagDB.create(sql);
	});	

	BigInt.prototype.toJSON = function() {
		return this.toString()
	}

	let presidentsData = $derived(
		db?.getTable('parquet_file').then(d => d.jsData) || []
	)

</script>


This is a test of parquet loading.

{#if db}
	{#await presidentsData}
		Loading database...
	{:then presidents}
    {#each presidents as row}
      <div>
        {JSON.stringify(row, null, 2)}
      </div>      
    {/each}
	{/await}
{/if}