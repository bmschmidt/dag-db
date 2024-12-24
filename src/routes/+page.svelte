<script lang="ts">
	import { onMount } from 'svelte';
	import sql from './sotu.sql?raw';
	import { DagDB } from '$lib/dag-db';

	let db: DagDB;
	onMount(async () => {
		db = await DagDB.create(sql)
	});
</script>

{#if db}
	{#each db.parsed as node}
		<pre>
		{JSON.stringify({...node, parsed: undefined}, null, 2)}
	</pre>
	{/each}
{/if}
