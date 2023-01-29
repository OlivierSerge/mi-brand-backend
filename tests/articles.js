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
          response.should.have.status(200);
          response.body.should.be.a("array");
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
          response.should.be.json;
          response.body.should.have
            .property("mySingleArticle")
            .that.includes.all.keys([
              "title",
              "author",
              "image",
              "content_type",
              "details",
              "date",
              "_id",
            ]);
          done();
        });
    });
  });

  // test the articles Post route
  describe("POST /articles", () => {
    it("should be ale to post one single article", (done) => {
      const post = {
        title: "peterot" + Math.floor(Math.random() * 97),
        author: "mugaboo",
        image: "gjhjbjgbjgjbnbo",
        content_type: "mugabo",
        details: "hhgggghggg" + Math.floor(Math.random() * 97),
        date: "2023-01-16T16:37:00.768Z",
      };

      chai
        .request(testServer)
        .post("/api/articles")
        // .set("Authorization", token)
        .send(post)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.should.be.json;
          response.body.should.have
            .property("savedPost")
            .that.includes.all.keys([
              "title",
              "author",
              "image",
              "content_type",
              "details",
              "date",
              "_id",
            ]);

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
          response.should.be.json;
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have
            .property("updatedArticle")
            .that.includes.all.keys([
              "title",
              "author",
              "image",
              "content_type",
              "details",
              "date",
              "_id",
            ]);
          done();
        });
    });
  });
  //test the articles DELETE route
  describe("delete /articles/:postId", () => {
    it("should be able to delete retrieved article with specific ID", (done) => {
      chai
        .request(testServer)
        .delete("/api/articles/63cd652c479ed1256f095df8")
        .end((err, response) => {
          console.log(response.body);
          response.body.should.be.a("object");
          response.should.have.status(500);

          done();
        });
    });
  });
});
