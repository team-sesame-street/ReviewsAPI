const db = require('./postgresdb.js');

let read = (query) => {
  const page = query.page || 0;
  const count = query.count || 5;
  var sort = 'r.date';
  if (query.sort === 'newest') {
    sort = 'r.date'
  };
  if (query.sort === 'helpful') {
    sort = 'r.helpfulness'
  };
  if (query.sort === 'relevant') {
    sort = 'idk'
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
                GROUP BY r.review_id
                ORDER BY ${sort} DESC
                limit ${count}`
  return db.query(script);
}

let write = (query) => {

}

module.exports.read = read;
module.exports.write = write;
//prod_id 40331 = More than 10 reviews
//prod_id 2 = More than 1 photo in review_id 5

//ORDER BY