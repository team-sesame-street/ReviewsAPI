require("dotenv").config();

const express = require('express');
const model = require('./models.js');

const app = express();

app.use(express.json());

app.get('/reviews', (req, res) => {
  model.read(req.query)
  .then((response) => {
    console.log(response.rows);
    res.status(200).send(response.rows);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send(err);
  })
})

app.get('/reviews/meta', (req, res) => {

})

app.post('/reviews', (req, res) => {

})

app.put('/reviews/:review_id/helpful', (req, res) => {

})

app.put('/reviews/:review_id/report', (req, res) => {

})

var port = process.env.PORT || 3000;

app.listen(port);
console.log(`Listening at http://localhost:${port}`);