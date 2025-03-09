CREATE TABLE test1 AS SELECT
-- CREATE TABLE paramtest AS SELECT 
--   SELECT UNNEST($left_set::JSON->>'$[*]') as strings;
  UNNEST(ARRAY[1.3, 2.5]) AS foo,
  UNNEST(ARRAY['a', 'b']) AS bar;

CREATE TABLE test2 AS SELECT $a as a;
CREATE TABLE test3 AS SELECT $b as a;

CREATE TABLE unioned AS SELECT * FROM test2
UNION ALL SELECT * FROM test3;

CREATE TABLE test4 AS SELECT SUM(a) sum FROM unioned;