const postgres = require('postgres');
const Promise = require('bluebird');

const sql = postgres('postgres://username:password@host:port/database', {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.DB_NAME,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS
});

const db = Promise.promisifyAll(sql);

module.exports = db;