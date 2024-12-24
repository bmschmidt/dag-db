WORK IN PROGRESS

This is a library for creating interactive in-browser datasets with duckdb.

The demo pages are in svelte, but the underlying states should be able 
to read any set of CREATE TABLE statements and build them into a set
of tables and views with methods to set them.

It constructs a DAG of tables and view, and updates necessary parts of the tree
when parameters change.