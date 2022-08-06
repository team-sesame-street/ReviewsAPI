require("dotenv").config();

const express = require('express');
const model = require('./models.js');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/reviews', (req, res) => {
  model.getReviews(req.query)
  .then((response) => {
    let reviewObj = {};
    reviewObj.product = req.query.product_id;
    reviewObj.page = req.query.page || 1;
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
    res.status(200).send(response.rows[0]);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send(err);
  })
})

app.post('/reviews', (req, res) => {
  model.writeReview(req.body)
  .then((response) => {
    res.status(201).send(response.rows);
  })
  .catch((err) => {
    console.log('review err', err);
    res.status(400).send(err);
  })
})

app.put('/reviews/:review_id/helpful', (req, res) => {
  model.updateHelp(req.params)
  .then((response) => {
    res.status(204).send(response);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send(err);
  })
})

app.put('/reviews/:review_id/report', (req, res) => {
  model.updateReport(req.params)
  .then((response) => {
    res.status(204).send(response);
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