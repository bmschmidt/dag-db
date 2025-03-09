CREATE OR REPLACE TABLE parquet_file AS SELECT * FROM
     'http://localhost:5173/sotwo.parquet';

CREATE MACRO dunning_llr (table_name, token_field, category_field, count_field, alpha := 0.5) AS TABLE
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
    --RANK() OVER (PARTITION BY category ORDER BY llr DESC) ordering,
    FROM pmi_part4 WHERE PMI > 0
    )
    SELECT * FROM pmi_part1;
