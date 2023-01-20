process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const testServer = require("../app");
let randomId;
//Assertion style
chai.should();
chai.use(chaiHttp);

describe("my-brand-backend", () => {
  // test the articles Get route
  describe("GET /articles", () => {
    it("should .............", (done) => {
      chai
        .request(testServer)
        .get("/articles")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("");
          done();
        });
    });
  });

  // test the articles GET by id route
  describe("GET /articles/:postId", () => {
    it("should .............", (done) => {
      chai
        .request(testServer)
        .get("articles/" + randomId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("");
          done();
        });
    });
  });

  // test the articles Post route
  describe("POST /articles/:postId", () => {
    it("should .............", (done) => {
      chai
        .request(testServer)
        .post("/articles")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("");
          done();
        });
    });
  });
  // test the articles PATCH route
  describe("PATCH /articles/:postId", () => {
    it("should .............", (done) => {
      chai
        .request(testServer)
        .patch("/articles/" + randomId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.should.have.property("id");
          response.body.should.have.property("");
          response.body.should.have.property("length").eq(10);
          done();
        });
    });
  });
  // test the articles DELETE route
  describe("delete /articles/:postId", () => {
    it("should .............", (done) => {
      chai
        .request(testServer)
        .delete("articles/:postId")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("");
          done();
        });
    });
  });
});
