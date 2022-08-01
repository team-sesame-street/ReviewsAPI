require("dotenv").config();

const express = require('express');
const model = require('./models.js');

const app = express();

app.use(express.json());

app.get('/reviews', (req, res) => {
  console.log('index', req.query)
  model.getReviews(req.query)
  .then((response) => {
    console.log(response.rows);
    let reviewObj = {};
    reviewObj.product = req.query.product_id;
    reviewObj.page = req.query.page || 0;
    reviewObj.count = req.query.count || 5;
    reviewObj.results = response.rows;
    res.status(200).send(reviewObj);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send(err);
  })
})

app.get('/reviews/meta', (req, res) => {
  model.getMeta(req.query)
  .then((response) => {
    console.log(response.rows);
    res.status(200).send(response.rows);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send(err);
  })
})

app.post('/reviews', (req, res) => {
  model.writeReview(req.body)
  .then((response) => {
    console.log(response.rows)
    res.status(201).send(response.rows);
  })
  .catch((err) => {
    console.log('review err', err);
    res.status(400).send(err);
  })
})

app.put('/reviews/:review_id/helpful', (req, res) => {
  console.log(req.params)
  model.updateHelp(req.params)
  .then((response) => {
    console.log(response);
    res.status(201).send(response);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send(err);
  })
})

app.put('/reviews/:review_id/report', (req, res) => {
  model.updateReport(req.params)
  .then((response) => {
    console.log(response);
    res.status(201).send(response);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send(err);
  })
})

var port = process.env.PORT || 3000;

app.listen(port);
console.log(`Listening at http://localhost:${port}`);

// app.post('/reviews', (req, res) => {
//   model.writeReview(req.body)
//   .then((response) => {
//     // console.log(response.rows[0].review_id);
//     model.writeCharReview(req.body.characteristics, response.rows[0].review_id);
//     res.status(201).send(response);
//   })
//   .catch((err) => {
//     console.log('review err', err);
//     res.status(400).send(err);
//   })
// })