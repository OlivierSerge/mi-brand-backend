
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const testServer = require("../app");
let randomId = "63c586f6e7f568be33380659";
//Assertion style
chai.should();
chai.use(chaiHttp);

describe("my-brand-backend", () => {
  // test the message Get route
  describe("GET /messages", () => {
    it("should be able to retrieve all contact us messages from DB", (done) => {
      chai
        .request(testServer)
        .get("/api/messages")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          // response.body.should.have.property("id");
          response.body.length.should.be.eql(response.body.length);
          done();
        });
    });
  });

  // test the messages GET by id route
  describe("GET /messages/:postId", () => {
    it("should be able to get one single message inquiry by its id", (done) => {
      chai
        .request(testServer)
        .get("/api/messages/" + randomId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          // response.body.should.have.property("id");
          // response.body.should.have.property("");
          done();
        });
    });
  });

  // test the messages Post route
  describe("POST api/messages/:postId", () => {
    it("should add new contact us message to the db", (done) => {
      let newMessage = {
        name: "petero",
        email: "mugaboo",
        adress: "kibagabaga",
        message: "mugabo",
        date: "2023-02-20",
      };
      chai
        .request(testServer)
        .post("/api/messages")
        .send(newMessage)
        .end((err, response) => {
          response.should.have.status(200);
          // response.body.should.be.a("object");
          // response.body.should.have.property("id");
          // response.body.should.have.property("");
          done();
        });
    });
  });
  // test the messages PATCH route
  describe("PATCH api/messages/:postId", () => {
    it("should be able to update one single message retrieved by its id", (done) => {
      let newMessage = {
        name: "petero",
        email: "mugaboo",
        adress: "kibagabaga",
        message: "mugabo",
        date: "2023-02-20",
      };
      chai
        .request(testServer)
        .patch("/api/messages/" + randomId)
        .send(newMessage)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          // response.body.should.have.property("id");
          // response.body.should.have.property("");
          // response.body.should.have.property("length").eq(10);
          done();
        });
    });
  });
  // test the message DELETE route
  describe("delete /messages/:postId", () => {
    it("should be able to delete one single message by its id", (done) => {
      chai
        .request(testServer)
        .delete("/api/messages/63ce8e5ec4165c48507f2bb1")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          // response.body.should.have.property("id");
          // response.body.should.have.property("");
          done();
        });
    });
  });
});
