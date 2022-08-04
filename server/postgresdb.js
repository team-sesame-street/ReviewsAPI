require("dotenv").config();
const postgres = require('postgres');
const { Pool, Client } = require('pg');
const Promise = require('bluebird');

const pool = new Pool ({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.DB_NAME,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS
});

const db = Promise.promisifyAll(pool);

module.exports = db;