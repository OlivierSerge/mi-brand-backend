//  npm i chai --save Dev mocha chai-http
const chai = require("chai");
const chaiHttp = require("chai-http");
const testServer = require("../app");
let randomId = "63c7ccb360692d3552e38609";
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
          response.should.be.json;
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
          response.should.be.json;
          response.body.should.have
            .property("singleUser")
            .that.includes.all.keys(["username", "password"]);
          done();
        });
    });
  });

  // test the users/signIn Post route
  describe("POST /users/signUp", () => {
    it("should allow a new user to register ", (done) => {
      const user = {
        username: "mark" + Math.floor(Math.random() * 97),
        password: "history",
        adress: "nyamata",
      };
      chai
        .request(testServer)
        .post("/api/users/signUp")
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.should.be.json;
          response.body.should.have
            .property("dbstored")
            .that.includes.all.keys(["username", "password", "_id"]);

          done();
        });
    });
  });
  // test the users PATCH route
  describe("PATCH api/users/userId", () => {
    it("should Update user's credentials", (done) => {
      const user = {
        username: "MugaboP",
      };
      chai
        .request(testServer)
        .patch("/api/users/" + randomId)
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.should.be.json;
          response.body.should.have
            .property("updatedUser")
            .that.includes.all.keys(["username", "password", "_id"]);
          done();
        });
    });
  });
  // test the user DELETE route
  describe("delete /users/:userId", () => {
    it("should DELETE user in users route", (done) => {
      chai
        .request(testServer)
        .delete("users/63c6e410a454c4d1ff55c958")
        .end((err, response) => {
          response.body.should.be.a("object");
          // response.should.have.status(204);

          done();
        });
    });
  });
  // test the user login POST route
  describe("POST /users/login", () => {
    it("should .............", (done) => {
      const user = {
        username: "serge",
        password: "history",
      };
      chai
        .request(testServer)
        .post("/users")
        .send(user)
        .end((err, response) => {
          console.log(response.body);
          console.log(err);
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("token");
          done();
        });
    });
  });
});



