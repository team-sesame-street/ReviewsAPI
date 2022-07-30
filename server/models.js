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
                  json_agg(coalesce(json_build_object('id', p.id, 'url', p.url))) AS photo
                FROM reviews r
                LEFT JOIN reviews_photos p ON p.review_id = r.review_id
                WHERE r.product_id = 40331
                GROUP BY r.review_id
                limit 10`
  return db.query(script);
}

module.exports.read = read;