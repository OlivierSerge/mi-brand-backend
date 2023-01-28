//  npm i chai --save Dev mocha chai-http
const chai = require("chai");
const chaiHttp = require("chai-http");
const testServer = require("../app");
let randomId = "63c6c2f7c54a13647ec2e617";
//Assertion style
chai.should();
chai.use(chaiHttp);

describe("my-brand-backend", () => {
  // test the users Get route
  describe("GET /users", () => {
    it("should GET all users registered users from DB", (done) => {
      chai
        .request(testServer)
        .get("/api/users")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          // response.body.should.have.property("id");
          // response.body.should.have.property("username");
          // response.body.should.have.property("password");
          done();
        });
    });
  });

  // test the users GET by id route
  describe("GET api/users/:userId", () => {
    it("should get one user by ID from DB", (done) => {
      chai
        .request(testServer)
        .get("/api/users/" + randomId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          // response.body.should.have.property("id");

          done();
        });
    });
  });

  // test the users/signIn Post route
  describe("POST /users/signIn", () => {
    it("should allow a new user to register ", (done) => {
      const user = {
        username: "serge",
        password: "history",
      };
      chai
        .request(testServer)
        .post("/api/users/signIn")
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");

          done();
        });
    });
  });
  // test the users PATCH route
  describe("PATCH api/users/userId", () => {
    it("should Update user's credentials", (done) => {
      const user = {
        username: "MugaboP",
        password: "amahoro",
      };
      chai
        .request(testServer)
        .patch("/api/users/")
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");

          done();
        });
    });
  });
  // test the user DELETE route
  describe("delete /users/:userId", () => {
    it("should DELETE user in users route", (done) => {
      chai
        .request(testServer)
        .delete("users/63c7ccb360692d3552e38609")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");

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

          done();
        });
    });
  });
});



