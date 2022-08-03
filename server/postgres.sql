\c reviews;

CREATE TABLE IF NOT EXISTS product (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INTEGER
);

CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INTEGER,
  date BIGINT,
  summary VARCHAR,
  body VARCHAR,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR,
  reviewer_email VARCHAR,
  response VARCHAR DEFAULT NULL,
  helpfulness INTEGER DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES product (id)
);

CREATE TABLE IF NOT EXISTS reviews_photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  url VARCHAR,
  FOREIGN KEY (review_id) REFERENCES reviews (review_id)
);

CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name VARCHAR NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product (id)
);

CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL,
  FOREIGN KEY (characteristic_id) REFERENCES characteristics (id),
  FOREIGN KEY (review_id) REFERENCES reviews (review_id)
);

\copy product FROM 'etl_files/product.csv' DELIMITER ',' CSV HEADER;
\copy reviews FROM 'etl_files/reviews.csv' DELIMITER ',' CSV HEADER;
\copy reviews_photos FROM 'etl_files/reviews_photos.csv' DELIMITER ',' CSV HEADER;
\copy characteristics FROM 'etl_files/characteristics.csv' DELIMITER ',' CSV HEADER;
\copy characteristic_reviews FROM 'etl_files/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

SELECT setval('product_id_seq', max(id)) FROM product;
SELECT setval('reviews_review_id_seq', max(review_id)) FROM reviews;
SELECT setval('reviews_photos_id_seq', max(id)) FROM reviews_photos;
SELECT setval('characteristics_id_seq', max(id)) FROM characteristics;
SELECT setval('characteristic_reviews_id_seq', max(id)) FROM characteristic_reviews;

CREATE INDEX ON reviews (product_id);
CREATE INDEX ON reviews_photos (review_id);
CREATE INDEX ON characteristics (product_id);
CREATE INDEX ON characteristic_reviews (characteristic_id);
CREATE INDEX ON characteristic_reviews (review_id);
