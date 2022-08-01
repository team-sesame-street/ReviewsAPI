const db = require('./postgresdb.js');

let getReviews = (query) => {
  const page = query.page || 0;
  const count = query.count || 5;
  const offset = count * page;
  var sort = 'r.date';
  if (query.sort === 'newest') {
    sort = 'r.date DESC'
  };
  if (query.sort === 'helpful') {
    sort = 'r.helpfulness DESC'
  };
  if (query.sort === 'relevant') {
    sort = 'r.date DESC, r.helpfulness DESC'
  };
  let script = `SELECT
                  r.review_id,
                  r.product_id,
                  r.rating,
                  r.summary,
                  r.recommend,
                  r.response,
                  r.body,
                  r.date,
                  r.reviewer_name,
                  r.helpfulness,
                  coalesce(json_agg(json_build_object('id', p.id, 'url', p.url))
                  FILTER (WHERE p.id IS NOT NULL), '[]') AS photo
                FROM reviews r
                LEFT JOIN reviews_photos p ON p.review_id = r.review_id
                WHERE r.product_id = ${query.product_id}
                AND r.reported = false
                GROUP BY r.review_id
                ORDER BY ${sort}
                LIMIT ${count} OFFSET ${offset}`;
  return db.query(script);
};

let getMeta = (query) => {
  console.log(query.product_id);
  let script = `SELECT
                  json_build_object(
                    '1', COUNT(*) FILTER (WHERE r.rating = 1):: VARCHAR,
                    '2', COUNT(*) FILTER (WHERE r.rating = 2):: VARCHAR,
                    '3', COUNT(*) FILTER (WHERE r.rating = 3):: VARCHAR,
                    '4', COUNT(*) FILTER (WHERE r.rating = 4):: VARCHAR,
                    '5', COUNT(*) FILTER (WHERE r.rating = 5):: VARCHAR
                  ) AS ratings,
                  json_build_object(
                    'false', COUNT(*) FILTER (WHERE r.recommend = false)::VARCHAR,
                    'true', COUNT(*) FILTER (WHERE r.recommend = true)::VARCHAR
                  ) AS recommended,
                (WITH char_rev AS (
                SELECT
                  c.name,
                  c.id,
                  AVG(cr.value)
                FROM characteristics c RIGHT JOIN characteristic_reviews cr
                ON c.id = cr.characteristic_id
                WHERE c.product_id = ${query.product_id}
                GROUP BY c.id
                ORDER BY c.id
                )
                SELECT json_object_agg(name, json_build_object('id', id, 'value', AVG::VARCHAR))
                FROM char_rev) AS characteristics
                FROM reviews r WHERE r.product_id = ${query.product_id}`;
  return db.query(script);
}

let writeReview = (body) => {
  let entryDate = new Date().getTime();
  // console.log(entryDate);
  // console.log(body);
  let noPhotoScript = `INSERT INTO reviews (
                          product_id,
                          rating,
                          date,
                          summary,
                          body,
                          recommend,
                          reported,
                          reviewer_name,
                          reviewer_email
                        )
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING review_id`;
  let photoScript = `WITH rev AS (
                      INSERT INTO reviews (
                        product_id,
                        rating,
                        date,
                        summary,
                        body,
                        recommend,
                        reported,
                        reviewer_name,
                        reviewer_email
                      )
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                      RETURNING review_id
                      )
                      INSERT INTO reviews_photos (
                        review_id,
                        url
                      )
                      VALUES ((SELECT review_id FROM rev), UNNEST(CAST($10 AS TEXT[])))
                      RETURNING review_id`;
  let noPhotoArray = [body.product_id, body.rating, entryDate, body.summary, body.body, body.recommend, false, body.name, body.email];
  let photoArray = [body.product_id, body.rating, entryDate, body.summary, body.body, body.recommend, false, body.name, body.email, body.photos];
  if (body.photos) {
    return db.query(photoScript, photoArray);
  } else {
    return db.query(noPhotoScript, noPhotoArray);
  };
};

let writeCharReview = (charObj, reviewID) => {
  // console.log(charObj, reviewID);
  let script = `INSERT INTO characteristic_reviews (
                  characteristic_id,
                  review_id,
                  value)
                  VALUES ($1, $2, $3)`;
  for (key in charObj) {
    let valueArray = [key, reviewID, charObj[key]];
    db.query(script, valueArray)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

let updateHelp = (params) => {
  let script = `UPDATE reviews
                SET helpfulness = helpfulness + 1
                WHERE review_id = ${params.review_id}`;
  return db.query(script);
}

let updateReport = (params) => {
  let script = `UPDATE reviews
                SET reported = true
                WHERE review_id = ${params.review_id}`;
  return db.query(script);
}

module.exports.getReviews = getReviews;
module.exports.getMeta = getMeta;
module.exports.writeReview = writeReview;
module.exports.writeCharReview = writeCharReview;
module.exports.updateHelp = updateHelp;
module.exports.updateReport = updateReport;
//prod_id 40331 = More than 10 reviews
//prod_id 2 = More than 1 photo in review_id 5

//ORDER BY

// let noPhotoScript = `WITH rev AS (INSERT INTO
//   reviews (
//     product_id,
//     rating,
//     date,
//     summary,
//     body,
//     recommend,
//     reported,
//     reviewer_name,
//     reviewer_email
//   )
//   VALUES (?,?,?,?,?,?,?,?,?) RETURNING review_id)
// INSERT INTO
//   characteristic_reviews (
//     characteristic_id,
//     review_id,
//     value
//   )
//   VALUES ((json_object_keys('?')),(SELECT review_id FROM rev),?)`