
const chai = require("chai");
const chaiHttp = require("chai-http");

const testServer = require("../app");
let randomId = "63ce7edfc4165c48507f2baf";
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
          response.should.be.json;
          response.body.should.have
            .property("oneClientMessage")
            .that.includes.all.keys([
              "name",
              "adress",
              "email",
              "message",
              "date",
              "_id",
            ]);
          done();
        });
    });
  });

  // test the messages Post route
  describe("POST api/messages/:postId", () => {
    it("should add new contact us message to the db", (done) => {
      let newMessage = {
        name: "petero" + Math.floor(Math.random() * 97),
        email: "mugabe@gmail.com",
        adress: "kibagabaga",
        message: Math.floor(Math.random() * 97) + "mugabo",
        date: "2023-02-20",
      };
      chai
        .request(testServer)
        .post("/api/messages")
        .send(newMessage)
        .end((err, response) => {
          // console.log(response.body);
          response.body.should.be.a("object");
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.have
            .property("savedMessages")
            .that.includes.all.keys([
              "name",
              "email",
              "adress",
              "message",
              "date",
              "_id",
            ]);
          done();
        });
    });
  });
  // test the messages PATCH route
  describe("PATCH api/messages/:postId", () => {
    it("should be able to update one single message retrieved by its id", (done) => {
      let newMessage = {
        name: "petero",
        email: "mugaboo@yahoo.com",
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
          response.should.be.json;
          response.body.should.have
            .property("upToDate")
            .that.includes.all.keys([
              "name",
              "email",
              "adress",
              "message",
              "date",
              "_id",
            ]);
          done();
        });
    });
  });
  // test the message DELETE route
  describe("delete /messages/:postId", () => {
    it("should be able to delete one single message by its id", (done) => {
      chai
        .request(testServer)
        .delete("/api/messages/63d592ed7fd86d6770d7a051")
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.should.be.json;
          done();
        });
    });
  });
});
