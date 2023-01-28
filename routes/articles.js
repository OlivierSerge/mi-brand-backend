const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const { articleValidation} = require("./validations");
const Article = require("../models/articles");
const authorize = require("../routes/verify");

router.get("/", async (req, res) => {
  console.log("hellooooo");
  try {
    // getting our article posts from Mongo
    const mongoDbArticles = await Article.find();
    res.status(200).json(mongoDbArticles);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
//submit new article post
router.post("/", async (req, res) => {
  try {
    // validate  newArticle inputs beforehand
    const { error } = articleValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // find if the user doesn't exist first
    const findInDb = await Article.findOne({ title: req.body.title });
    // check if user exixts

    if (findInDb) {
      return res.status(400).json({ message: "this article exists" });
    }
    // add the newArticle
    const newArticlePost = new Article({
      title: req.body.title,
      author: req.body.author,
      image: req.body.image,
      content_type: req.body.content_type,
      details: req.body.details,
    });
    const savedPost = await newArticlePost.save();

    res
      .status(200)
      .json({ message: "article created successfully", savedPost });
  } catch (err) {
    res.status(400).json({ message: err });
    console.log(err);
  }
});
//getting single article by id
router.get("/:postId", async (req, res) => {
  const mySingleArticle = await Article.findById(req.params.postId);
  if (mySingleArticle) {
    res.status(200).json({ mySingleArticle });
  } else {
    res.status(400).json({ message: "the article not found verify" });
  }
});
//deleting single article by id
router.delete("/:postId", authorize, async (req, res, next) => {
  try {
    //check if userId exists in the database
    const myArticle = await Article.findOne({ _id: req.params.postId });
    if (!myArticle) {
      return res.status(400).json({
        message:
          "the article you're trying to delete doesn't exist, verify your inputs",
      });
    }
    await Article.remove({ _id: req.params.postId });
    const verify = await Article.findOne({ _id: req.params.postId });
    res
      .status(200)
      .json({ message: "article deletion went succesful", verify });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
//updating single article by id
router.patch("/:postId", async (req, res) => {
  try {
    const isAvailable = await Article.findOne({ _id: req.params.postId });
    if (!isAvailable) {
      return res
        .status(400)
        .json({ message: "no such article found,verify your inputs" });
    }
    await Article.updateOne(
      { _id: req.params.postId },
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          image: req.body.image,
          content_type: req.body.content_type,
          details: req.body.details,
          date: req.body.date,
        },
      }
    );
    const updatedArticle = await Article.findOne({ _id: req.params.postId });
    res
      .status(200)
      .json({ messsage: "article data update succeed", updatedArticle });
  } catch (err) {
    res.status(400).json({ message: "update error" });
  }
});
module.exports = router;
