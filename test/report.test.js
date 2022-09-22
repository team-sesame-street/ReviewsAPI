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
//     ['PUT', `${BASE_URL}/reviews/?product_id=40344/report`, null, { tags: { name: 'Report' } }],
//     ['PUT', `${BASE_URL}/reviews/?product_id=40345/report`, null, { tags: { name: 'Report' } }],
//     ['PUT', `${BASE_URL}/reviews/?product_id=40346/report`, null, { tags: { name: 'Report' } }],
//     ['PUT', `${BASE_URL}/reviews/?product_id=40347/report`, null, { tags: { name: 'Report' } }],
//   ])

//   sleep(1);

// };