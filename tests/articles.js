process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const testServer = require("../app");
let randomId = "63c9d7b2777b38804ddf6999";
//Assertion style
chai.should();
chai.use(chaiHttp);

describe("my-brand-backend", () => {
  // test the articles Get route
  describe("GET /articles", () => {
    it("should get all articles", (done) => {
      chai
        .request(testServer)
        .get("/api/articles/")
        .end((err, response) => {
          // console.log(response.body);
          response.should.have.status(200);
          response.body.should.be.a("array");

          // response.body.should.have.property("_id");
          // response.body.data.should.have.property("title");
          // response.body.should.have.property("author");
          // response.body.should.have.property("content_type");
          // response.body.should.have.property("details");
          // response.body.should.have.property("date");
          response.body.length.should.be.eql(response.body.length);
          done();
        });
    });
  });

  // test the articles GET by id route
  describe("GET api/articles/:postId", () => {
    it("should  get single article", (done) => {
      chai
        .request(testServer)
        .get("/api/articles/" + randomId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          // response.body.should.have.property("id");
          response.body.should.have.property("title");
          response.body.should.have.property("author");
          response.body.should.have.property("content_type");
          response.body.should.have.property("details");
          response.body.should.have.property("date");
          done();
        });
    });
  });

  // test the articles Post route
  describe("POST /articles/:postId", () => {
    it("should be ale to post one single article", (done) => {
      let post = {
        title: "petero",
        author: "mugaboo",
        image: "gjhjbjgbjgjbnbo",
        content_type: "mugabo",
        details: "hhgggghggg",
      };
      chai
        .request(testServer)
        .post("/api/articles")
        .send(post)
        .end((err, response) => {
          // console.log(response.body);
          response.should.have.status(200);
          response.body.should.be.a("object");
          // response.body.should.have.property("id");
          response.body.should.have.property("title");
          response.body.should.have.property("author");
          response.body.should.have.property("content_type");
          response.body.should.have.property("details");
          response.body.should.have.property("date");
          done();
        });
    });
  });
  // test the articles PATCH route
  describe("PATCH api/articles/:postId", () => {
    it("should be able to update retrieved article contents", (done) => {
      let post = {
        title: "ntamabyariro",
        author: "mutama",
        image: "hogogogogogogogo",
        content_type: "undefined",
        details: "many moretexts and comparison",
      };
      chai
        .request(testServer)
        .patch("/api/articles/" + randomId)
        .send(post)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(200);
          response.body.should.be.a("object");

          // response.body.should.have.property("id");
          // response.body.should.have.property("title");
          // response.body.should.have.property("author");
          // response.body.should.have.property("content_type");
          // response.body.should.have.property("details");
          // response.body.should.have.property("date");
          done();
        });
    });
  });
  //test the articles DELETE route
  describe("delete /articles/:postId", () => {
    it("should be able to delete retrieved article with specific ID", (done) => {
      chai
        .request(testServer)
        .delete("/api/articles/63c4678ce148ecc3e954c7da")
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(200);

          done();
        });
    });
  });
});
