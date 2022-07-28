CREATE DATABASE reviews;

CREATE TABLE products (
  id SERIAL PRIMARY KEY
);

CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INTEGER,
  'date' DATE,
  summary VARCHAR,
  body VARCHAR,
  recommend BINARY,
  reported BINARY,
  reviewer_name VARCHAR,
  reviewer_email VARCHAR,
  response VARCHAR DEFAULT NULL,
  helpfulness INTEGER DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  'url' VARCHAR,
  FOREIGN KEY (review_id) REFERENCES reviews (review_id)
);

CREATE TABLE meta (
  id SERIAL PRIMARY KEY,
  ratings INTEGER,
  recommended INTEGER,
  characteristics INTEGER,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  1 INTEGER,
  2 INTEGER,
  3 INTEGER,
  4 INTEGER,
  5 INTEGER,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE recommended (
  id SERIAL PRIMARY KEY,
  true INTEGER,
  false INTEGER,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  fit_id INTEGER,
  fit_value INTEGER,
  length_id INTEGER,
  length_value INTEGER,
  comfort_id INTEGER,
  comfort_value INTEGER,
  quality_id INTEGER,
  quality_value INTEGER,
  size_id INTEGER,
  size_value INTEGER,
  width_id INTEGER,
  width_value INTEGER,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products (id)
);