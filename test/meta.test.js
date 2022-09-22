// import http from "k6/http";
// import { sleep } from 'k6';

// export let options = {
//   stages: [
//     { duration: '15s', target: 10 },
//     { duration: '30s', target: 10},
//     { duration: '15s', target: 100 },
//     { duration: '30s', target: 100 },
//     { duration: '1m', target: 100 },
//     { duration: '15s', target: 200 },
//     { duration: '30s', target: 200 },
//     { duration: '1m', target: 200 },
//     { duration: '15s', target: 400 },
//     { duration: '30s', target: 400 },
//     { duration: '1m', target: 400 },
//     { duration: '1m', target: 0 },
//   ],
// };

// export default () => {

//   const BASE_URL = 'http://localhost:3000';

//   const responses = http.batch([
//     ['GET', `${BASE_URL}/reviews/meta/?product_id=40344`, null, { tags: { name: 'Meta' } }],
//     ['GET', `${BASE_URL}/reviews/meta/?product_id=40345`, null, { tags: { name: 'Meta' } }],
//     ['GET', `${BASE_URL}/reviews/meta/?product_id=40346`, null, { tags: { name: 'Meta' } }],
//     ['GET', `${BASE_URL}/reviews/meta/?product_id=40347`, null, { tags: { name: 'Meta' } }],
//   ])

//   sleep(1);

// };