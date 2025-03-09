CREATE OR REPLACE TABLE parquet_file AS SELECT * FROM
     'http://localhost:5173/sotwo.parquet';

CREATE or replace MACRO dunning_llr (table_name, token_field, category_field, count_field, alpha := 0.5) AS TABLE
    WITH input AS (
    SELECT
    token_field token,
    SUM(count_field)::FLOAT AS count,
    category_field AS category
    FROM query_table(table_name)
    GROUP BY token, category
    ),
    word_counts AS (
    SELECT token, category, count FROM input
    ),
    word_totals AS (
    SELECT token, sum("count")::FLOAT AS word_total FROM input GROUP BY token
    ),
    category_totals AS (
    SELECT category, sum("count")::FLOAT AS category_size FROM input GROUP BY category
    ),
    pmi_part1 AS
        ( SELECT
            SUM("count") OVER ()::FLOAT as corpus_size,
            *
            FROM (word_counts NATURAL JOIN word_totals) 
            JOIN category_totals ON (category_totals.category = word_counts.category)
        ),
    -- A few steps to define all the variables we need.
    pmi_part2 AS (
    SELECT *,
        greatest(word_total - "count", alpha) AS count_excluding,
        corpus_size - category_size         AS size_excluding_category
    FROM pmi_part1 
    ),
    pmi_part3 AS (
    SELECT *,
    category_size           * (word_total / corpus_size) AS expected_here,
    size_excluding_category * (word_total / corpus_size) AS expected_elsewhere,
    FROM pmi_part2
    ),
    pmi_part4 AS (
    SELECT *,
    2 * (
        "count" * log("count" / expected_here) + 
        "count_excluding" * log(count_excluding / expected_elsewhere) 
    ) AS llr,
    log("count" / expected_here) AS pmi,
    log("count_excluding" / expected_elsewhere) AS inverse_pmi,
    "count_excluding" as count_not_in_category
    FROM pmi_part3),
    ranked_ordered AS (
    SELECT category,
    token,
    count,
    word_total,
    pmi,
    llr,
    count_not_in_category,
    inverse_pmi,
    -- Below errors
--    RANK() OVER (PARTITION BY category ORDER BY llr DESC) ordering,
    FROM pmi_part4 WHERE PMI > 0
    )
SELECT
    token, category, count,
    word_total,
    pmi,
    llr,
    count_not_in_category,
    inverse_pmi,-- ordering
    FROM ranked_ordered;

CREATE VIEW tokenized AS
    SELECT year, paragraph, president,
    UNNEST(regexp_extract_all("nc:text", '([\p{L}\p{M}\p{Nd}\p{Pc}]+)')) as word,
    FROM parquet_file;

CREATE VIEW bigrams AS
 WITH bg1 as (
    FROM tokenized
        SELECT president, word, year, paragraph, LEAD(word) OVER (PARTITION BY year, paragraph) as word1
    )
 SELECT president, word, year, paragraph, word || ' ' || word1 AS token FROM bg1 WHERE word1 IS NOT NULL;
 

COMMENT ON MACRO dunning_llr IS 
    'Calculate Dunning log likelihood ratio for a given table';
    
CREATE VIEW trigrams AS
    WITH bg1 as (
        FROM tokenized
            SELECT president, word, year, paragraph, 
            LEAD(word) OVER (PARTITION BY year, paragraph) as word1,
            LEAD(word, 2) OVER (PARTITION BY year, paragraph) as word2
        )
    SELECT president, word, year, paragraph, word || ' ' || word1 || ' ' || word2 AS token FROM bg1 WHERE word1 IS NOT NULL AND word2 IS NOT NULL;

CREATE TABLE bigram_counts AS
    SELECT president, token, COUNT(*) as count,
    FROM bigrams
    GROUP BY president, token;

COMMENT ON TABLE bigram_counts IS 'Bigram counts for each president';

CREATE VIEW all_tokens AS 
    SELECT * FROM bigram_counts
    UNION ALL
    SELECT * FROM trigram_counts;

CREATE TABLE top_tokens_left AS
SELECT token, sum(count) as count
    FROM all_tokens
    NATURAL JOIN left_set
    --WHERE regexp_matches(token, $re_filter)
    GROUP BY token
    ORDER BY count DESC
    LIMIT 25;

CREATE TABLE top_tokens_right AS
    SELECT token, sum(count) as count
        FROM all_tokens
        NATURAL JOIN right_set
        --WHERE regexp_matches(token, $re_filter)
        GROUP BY token
        ORDER BY count DESC
        LIMIT 25;

CREATE TABLE trigram_counts AS
    SELECT president, token, COUNT(*) as count,
    FROM trigrams
    GROUP BY president, token;
    
CREATE TABLE presidents AS
    SELECT DISTINCT president FROM parquet_file;

 CREATE TABLE left_set AS
    SELECT UNNEST($left_set::JSON->>'$[*]') as president;

 CREATE TABLE left_count AS
    SELECT count(*) as count FROM left_set NATURAL JOIN tokenized GROUP BY ALL;

CREATE TABLE right_set AS
    SELECT UNNEST($right_set::JSON->>'$[*]') as president;

CREATE TABLE right_count AS
    SELECT count(*) as count FROM right_set NATURAL JOIN tokenized GROUP BY ALL;

CREATE TABLE distinguishing_words AS 
WITH l AS (
    SELECT *, 'left' as category FROM all_tokens NATURAL JOIN left_set
),
r AS (
    SELECT *, 'right' as category FROM all_tokens NATURAL JOIN right_set
),
c AS (
    SELECT * FROM l UNION ALL SELECT * FROM r
),
o AS (
    SELECT * FROM dunning_llr(c, token, category, count)
),
ranked_ordered AS (
    SELECT *,
    RANK() OVER (PARTITION BY category ORDER BY llr DESC) ordering
     FROM o
)
SELECT 
   category, token as word, * FROM ranked_ordered WHERE ordering <= 100;

CREATE TABLE distinguishing_right AS
    SELECT word, count, ROUND(llr, 2) llr FROM distinguishing_words WHERE category = 'right' ORDER BY llr DESC LIMIT 20;

CREATE TABLE distinguishing_left AS
    SELECT word, count, ROUND(llr, 2) llr FROM distinguishing_words WHERE category = 'left' ORDER BY llr DESC LIMIT 20;
