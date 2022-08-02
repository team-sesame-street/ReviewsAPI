const request = require("supertest")("http://localhost:3000");
const expect = require("chai").expect;

describe("GET request to /reviews", () => {
  let error, response;

  before(function(done) {
    request.get("/reviews/?product_id=40346").end((err, res) => {
      error = err, response = res;
      done();
    })
  });

  it('return status code 200', () => {
    expect(response.status).to.eql(200);
  });

  it('return reviews for correct product', () => {
    expect(response.body.product).to.eql('40346');
  });

  it('return array of reviews', () => {
    expect(response.body.results).to.exist;
  });

});

describe("GET request to /reviews/meta", () => {
  let error, response;

  before(function(done) {
    request.get("/reviews/meta/?product_id=40346").end((err, res) => {
      error = err, response = res;
      done();
    })
  });

  it('return status code 200', () => {
    expect(response.status).to.eql(200);
  });

  it('return metadata on ratings', () => {
    expect(response.body.ratings).to.exist;
  });

  it('return metadata on recommended', () => {
    expect(response.body.recommended).to.exist;
  });

  it('return metadata on characteristics', () => {
    expect(response.body.characteristics).to.exist;
  });

});

describe("POST request to /reviews", () => {
  let error, response;
  let body = {
    "product_id": 40346,
    "rating": 5,
    "summary": "test",
    "body": "This is a test. This is a test. This is a test. This is a test. This is a test.",
    "recommend": true,
    "name": "tester",
    "email": "tester@gmail.com",
    "photos": ['url', 'url2'],
    "characteristics": { "135224": 5, "135225": 5, "135226": 5, "135227": 5 }
  };

  before(function(done) {
    request.post("/reviews").send(body).end((err, res) => {
      error = err, response = res;
      done();
    })
  })

  it('return status code 201', () => {
    expect(response.status).to.eql(201);
  });

});

describe("PUT request to /helpful", () => {
  let error, response;

  before(function(done) {
    request.put("/reviews/5774983/helpful").end((err, res) => {
      error = err, response = res;
      done();
    })
  });

  it('return status code 204', () => {
    expect(response.status).to.eql(204);
  });

});

describe("PUT request to /report", () => {
  let error, response;

  before(function(done) {
    request.put("/reviews/5774983/report").end((err, res) => {
      error = err, response = res;
      done();
    })
  });

  it('return status code 204', () => {
    expect(response.status).to.eql(204);
  });

});