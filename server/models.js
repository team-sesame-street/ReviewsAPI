const db = require('./postgresdb.js');

let read = (query) => {
  console.log('model', query);
  const product_id = query.product_id;
  const page = query.page;
  const count = query.count;
  const sort = query.sort;
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
                WHERE r.product_id = 2
                GROUP BY r.review_id
                limit 10`
  return db.query(script);
}

module.exports.read = read;

//prod_id 40331 = More than 10 reviews
//prod_id 2 = More than 1 photo in review_id 5