//  npm i chai --save Dev mocha chai-http
const chai = require("chai");
const chaiHttp = require("chai-http");
const testServer = require("../app");
let randomId;
//Assertion style
chai.should();
chai.use(chaiHttp);

describe("my-brand-backend", () => {
  // test the message Get route
  describe("GET /messages", () => {
    it("should .............", (done) => {
      chai
        .request(testServer)
        .get("/messages")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("");
          done();
        });
    });
  });

  // test the messages GET by id route
  describe("GET /messages/:postId", () => {
    it("should .............", (done) => {
      chai
        .request(testServer)
        .get("messages/" + randomId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("");
          done();
        });
    });
  });

  // test the messages Post route
  describe("POST /messages/:postId", () => {
    it("should .............", (done) => {
      chai
        .request(testServer)
        .post("/messages")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("");
          done();
        });
    });
  });
  // test the messages PATCH route
  describe("PATCH /messages/:postId", () => {
    it("should .............", (done) => {
      chai
        .request(testServer)
        .patch("/messages/" + randomId)
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
  // test the message DELETE route
  describe("delete /messages/:postId", () => {
    it("should .............", (done) => {
      chai
        .request(testServer)
        .delete("messages/:postId")
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
