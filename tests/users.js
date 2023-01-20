//  npm i chai --save Dev mocha chai-http
const chai = require("chai");
const chaiHttp = require("chai-http");
const testServer = require("../app");
let randomId;
//Assertion style
chai.should();
chai.use(chaiHttp);

describe("my-brand-backend", () => {
  // test the users Get route
  describe("GET /users", () => {
    it("should GET all users.............", (done) => {
      chai
        .request(testServer)
        .get("/users")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("");
          done();
        });
    });
  });

  // test the users GET by id route
  describe("GET /users/:userId", () => {
    it("should .............", (done) => {
      chai
        .request(testServer)
        .get("users/" + randomId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("");
          done();
        });
    });
  });

  // test the users Post route
  describe("POST /users/:userId", () => {
    it("should .............", (done) => {
      chai
        .request(testServer)
        .post("/users")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("");
          done();
        });
    });
  });
  // test the users PATCH route
  describe("PATCH /users/:userId", () => {
    it("should Update user's credentials", (done) => {
      const user = {
        username: "MugaboP",
        password: "amahoro",
      };
      chai
        .request(testServer)
        .patch("/users/" + randomId)
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
  // test the user DELETE route
  describe("delete /users/:userId", () => {
    it("should DELETE user in users route", (done) => {
      chai
        .request(testServer)
        .delete("users/" + randomId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("");
          done();
        });
    });
  });
  // test the user login POST route
  describe("POST /users/login", () => {
    it("should .............", (done) => {
      chai
        .request(testServer)
        .post("/users")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("");
          done();
        });
    });
  });
  // test the user signIn POST route
  describe("POST /users/signUp", () => {
    it("should .............", (done) => {
      chai
        .request(testServer)
        .post("/users")
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
