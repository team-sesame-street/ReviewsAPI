const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.MONGODB_HOST}/${process.env.MONGODB_HOST}`);

let productSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number
});

let reviewSchema = new mongoose.Schema({
  review_id: {
    type: Number,
    unique: true
  },
  product_id: Number,
  rating: Number,
  date: Date,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: Number,
  photos: Array
});

let reviewPhotoSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  review_id: Number,
  url: String
});

let characteristicSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  product_id: Number,
  name: String
});

let characteristicReviewSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  characteristic_id: Number,
  review_id: Number,
  value: Number
});