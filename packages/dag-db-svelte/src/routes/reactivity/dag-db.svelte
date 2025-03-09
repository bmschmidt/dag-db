<script lang="ts">
	import type { DagDBSvelte } from "$lib/dagdb.svelte.js";

  let { db, a=$bindable(), b=$bindable() } : {db: DagDBSvelte, a: number, b: number} = $props();

</script>
<input type="number" bind:value={a} />
<input type="number" bind:value={b} />
<br>
{#await db.scalar('test4')}
  waiting for test table
{:then test1} 
  {db.params.a} + {db.params.b} = {test1}
{/await}