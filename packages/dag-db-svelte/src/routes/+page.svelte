<script lang="ts">
	  import {
    Header,
    HeaderNav,
    Content,
    Grid,
    Row,
    Column,
	DataTable,
	OrderedList,
	ListItem
  } from "carbon-components-svelte";

	import { browser } from '$app/environment'; 

	import sql from './sotu.sql?raw';
	import { DagDB, type LoadedDagDB } from 'dag-db';
	import { DagDBSvelte } from './dagdb.svelte.ts';
	import Mermaid from './Mermaid.svelte';

	let db: DagDBSvelte | null = $state(null);

	if (browser) {
		console.log("Creating database")
		DagDBSvelte
			.create(sql, {left_set : ["Barack Obama"], right_set: ["Donald Trump"]})
			.then(d => {
				db = d
				db.params = {left_set: ["George W. Bush"], right_set: ["Donald Trump"]}
			})
	}
	

</script>

<Header company="Ben Schmidt" platformName="Dag-DB">
  <HeaderNav>
		
  </HeaderNav>
</Header>



<Content>
  <Grid>
		<Row>
			<Column>

			<h1>Dag-DB</h1>
			<p>
				Dag-DB is a node library to write complicated, multi-step data processing flows 
				in a single SQL file
				that builds an in-browser, reactive duckdb database. By using duckdb's SQL parser,
				it builds out a network (a "directed acyclic graph" -- DAG) of which tables
				depend on which other tables for their creation, and uses named parameters to
				update only the portions of the graph that are affected.
			</p>
			<p>
				Dag-DB is heavily inspired by my experience using Observable notebooks for data visualization;
				it's the best data-editing experience I've had, especially when working with js data structures.
				But
				while build duckdb-oriented pipelines there, I frequently found myself creating shadow 
				javascript variables for every duckdb python to trigger reactive updates.
			</p><p>But managing
				SQL state in javascript is awkward; you end up with two sources of truth, and lots
				of heavily templated SQL sprinkled into javascript code in places where you can't 
				get good syntax highlighting, easy editing, or code reuse. Watching Hamilton Ulmer's
				worth with DuckDB's AST parser, I wanted to try and build something where I could actually
				design an entire database worth of relations <em>in SQL*.</em>
			</p>
			</Column>
		</Row>
		{#if db}
			<Row>
				<Column>
					<h2>Example</h2>
					<p>
						As an example, I'm going to choose two sets of presidents and compare the language
					in their state of the union addresses. My go-to keyword method are <a href=https://stats.stackexchange.com/questions/179010/difference-between-pointwise-mutual-information-and-log-likelihood-ratio>Dunning Log-Likelihood</a>
					ratios, but they are kind of a pain to calculate.
				</p>
				<p>
					The flow here will be:
					
					<OrderedList>
						<ListItem>Take the full text of the last 100 years of speeches</ListItem>
						<ListItem>Split them into words using a regular expression in duckdb</ListItem>
						<ListItem>Build the tokens into bigrams and trigrams using window queries</ListItem>
						<ListItem>Define two lists of presidents among those</ListItem>
						<ListItem>Calculate the log-likelihood ratio of each token in the left set compared to the right set</ListItem>
					</OrderedList>
				</p>
				<p>
					These are not operations we want to do dozens of times! If we add Barack Obama to the left set, we don't want to recalculate
					the bigram counts for everyone else. Instead, we want to update only a portion of the set. Below you can see the graph that Dag-DB has inferred by parsing the sql
					file. Nodes are grey while loading, and blue once a table has been created. (Tables are rectangles; views are rounded rectangles; parameters are rhombuses; and macros are boxed rectangles.)
				</p>
			</Column>
		</Row>

			{#await db.array('presidents')}
				Loading database...
			{:then presidents}
			<Row>
				<Column>
				<Mermaid code={db.mermaid} {db} />
				</Column>
			</Row>
			<Row>
			<Column padding>
				<div role="group" aria-label="selectable checks" style="display:flex; flex-direction:row; flex-wrap: wrap;">
					{#each presidents as president}
					<div style="margin: 0em 0.5em;">
						<label>
						<input type="checkbox" checked={(db.params.left_set as string[] || []).includes(president)} onclick={() => {
							if ((db!.params.left_set as string[]).includes(president)) {
								db!.params.left_set = db!.params.left_set.filter(d => d != president)
							} else {
								db!.params.left_set = [...(db!.params.left_set || []), president]
							}
						}} />
							{president}
						</label>
						</div>
					{/each}
				</div>
				{#await db.scalar('left_count')}
				Counting words...
				{:then left_size}
				{left_size} words
				{/await}
			</Column>
			<Column padding>
			<div role="group" aria-label="selectable checks" style="display:flex; flex-direction:row; flex-wrap: wrap;">
				{#each presidents as president}
				<div style="margin: 0em 0.5em;">
					<label>
					<input type="checkbox" checked={(db.params.right_set as string[] || []).includes(president)} onclick={() => {
						if ((db!.params.right_set as string[]).includes(president)) {
							db!.params.right_set = db!.params.right_set.filter(d => d != president)
						} else {
							db!.params.right_set = [...(db!.params.right_set || []), president]
						}
					}} />
												{president}

					</label>

					</div>
				{/each}
			</div>
			{#await db.scalar('right_count')}
			Counting words...
			{:then right_size}
			{right_size} words
				{/await}
					</Column>
				</Row>	

			{/await}
			<Row>
					{#snippet distinguishing_terms(val: string)}
					<Column>
						{#await db.tbs[val]?.jsData}
							<p>loading...</p>
						{:then tokens}
						{#if tokens}
						<DataTable
							headers={Object.keys(tokens![0]).map(d => ({key: d, value: d}))}
							rows={tokens!.map((d, i) => ({...d, id: '' + i}))}
						/>
						{/if}
						{/await}
					</Column>
					{/snippet}
					{@render distinguishing_terms("distinguishing_left")}
					{@render distinguishing_terms("distinguishing_right")}
				</Row>
				<Row>
			<Column>


				{#snippet top_tokens(val: string)}
					{#await db.tbs[val]?.jsData}
						<p>loading...</p>
					{:then tokens}
						<div class="bigrams">
							<div class="entries">
						{#each (tokens || []).slice(0, 100) as token}
							<div>
								{token.token} ({token.count} uses)
							</div>
						{/each}
						</div>
					</div>
					{/await}
				{/snippet}
	<div class="results">
		{@render top_tokens("top_tokens_left")}
		{@render top_tokens( "top_tokens_right")}
	</div>

			</Column>
		</Row>
{/if}

	</Grid>
</Content>
<style>
	.results {
		display: flex;
		flex-direction: row;
	}
	.bigrams {
		display: flex;
		flex-direction: column;
		margin: 1em;
	}
	.header {
		font-weight: bold;
	}
	.entries {
		display: flex;
		flex-direction: column;
	}

	p {
		max-width: 40em;
	}
</style>