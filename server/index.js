require("dotenv").config();

const express = require('express');
const db = require('./postgresdb.js');

const app = express();

app.use(express.json());

var port = process.env.PORT || 3000;

app.listen(port);
console.log(`Listening at http://localhost:${port}`);