<script lang="ts">
  import mermaid from 'mermaid';
	import type { DagDBSvelte } from './dagdb.svelte';
  const {code, db} : {code: string, db: DagDBSvelte} = $props()
  const svg = $derived(mermaid.render('mermaid', code))

  svg.then(s => console.log({s}))
  // Once the svg is loaded, we can add some interactivity
  // to the nodes in the graph
  const reformatNodes = $derived((svg: string) => {
    const {tbs} = db
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const nodes = doc.querySelectorAll('.node');
    nodes.forEach(node => {
      const rect = node.querySelector('rect');
      const label = node.querySelector('.nodeLabel>p')?.innerHTML;
      if (label && rect && !tbs[label]) {
        rect.setAttribute('style', 'fill: #C1C2C3;');
      }
    })
    return new XMLSerializer().serializeToString(doc);
  })
</script>

<main>
  {#await svg}
    <p>Loading...</p>
  {:then img} 
    {console.log({img})}
    {@html reformatNodes(img.svg)}
  {/await}
</main>