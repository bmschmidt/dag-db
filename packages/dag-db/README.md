# Dag-DB

*"The way Codd intended"*

Reactive SQL.

This is a library for creating interactive in-browser datasets with duckdb.

See dag-db-svelte and dag-db-react for real-world examples. The underlying states should be able 
to read any set of CREATE TABLE statements and build them into a set
of tables and views with methods to set them.

It constructs a DAG of tables and view, and updates necessary parts of the tree
when parameters change.


# Why?

SQL is the most powerful language for doing complicated table manipulations,
and duckdb-wasm is the simplest, fastest way to handle million+ row datasets in the browser
today.

But if you build a dashboard up with duckdb, you've got some problems.
You're writing lots of weird templated strings; you don't get good syntax highlighting on your sql; 
you have to manually track dependency graphs between tables. Maybe you write some 
crazy long common table expressions to get the data you want.

