CREATE OR REPLACE TABLE p1 AS SELECT * FROM
     './sotwo.parquet';


CREATE VIEW tokenized AS
    SELECT "@id" id, year,
    UNNEST(regexp_extract_all("nc:text", '([\p{L}\p{M}\p{Nd}\p{Pc}]+)')) as word,
    FROM p1
    WHERE president = $president;

CREATE OR REPLACE TABLE wordcounts AS SELECT "@id" id, 
        year,
        "nc:text" 
        FROM
         p1;

CREATE VIEW tokens_pass_1 
    AS SELECT word, COUNT(*) df, SUM(count) word_total
    FROM wordcounts 
    GROUP BY word;

CREATE TABLE top_words AS
    SELECT word, year, count, rank() OVER (PARTITION BY year ORDER BY count DESC) as rank
    FROM wordcounts
    WHERE LENGTH(word) >= $2
    HAVING rank <= 10;


CREATE TABLE tokens AS SELECT word, log((SELECT MAX(df) FROM tokens_pass_1) / df) as idf,
  df, word_total FROM tokens_pass_1;

CREATE TABLE lengths 
    AS 
    WITH t1 AS (
        SELECT id, COUNT(*) n_tokens, SUM(count) wordcount 
        FROM wordcounts
        GROUP BY id
    )
    SELECT * FROM wordcounts GROUP BY id;


CREATE TABLE "tf_table" AS 
    SELECT word, id, count::FLOAT/wordcount as tf, count::FLOAT / wordcount * idf as tfidf
    FROM wordcounts w NATURAL JOIN tokens NATURAL JOIN lengths l;

CREATE TABLE tfidf_lengths AS SELECT id, sqrt(SUM(tfidf ^ 2)) as tfidf_mag 
    FROM tf_table GROUP BY id;

CREATE TABLE tfidf_normalized AS
    SELECT id, word, tfidf / tfidf_mag as tfidf_normalized
    FROM tf_table NATURAL JOIN tfidf_lengths;