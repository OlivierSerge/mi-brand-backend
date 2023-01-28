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
router.post("/", async (req, res, next) => {
  console.log("hello world");

  // validate  newArticle inputs beforehand
  const { error } = articleValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // find if the user doesn't exist first
  const findInDb = await Article.findOne({ title: req.body.title });
  // check if user exixts
  if (findInDb) {
    res.status(400);
    const error = new Error("this article exists");
    return next(error);
  }
  // add the newArticle
  const newArticlePost = new Article({
    title: req.body.title,
    author: req.body.author,
    image: req.body.image,
    content_type: req.body.content_type,
    details: req.body.details,
  });
  const savedPosts = await newArticlePost.save();
  try {
    res.status(200).json(savedPosts);
  } catch (err) {
    res.status(400).json({ message: err });
    console.log(err);
  }
});
//getting single article by id
router.get("/:postId", async (req, res) => {
  try {
    const mySingleArticle = await Article.findById(req.params.postId);
    res.status(200).json(mySingleArticle);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
//deleting single article by id
router.delete("/:postId", async (req, res, next) => {
  try {
    //check if userId exists in the database

    const myArticle = await Article.findOne({ _id: req.params.postId });
    if (!myArticle) {
      return next();
    }
    await Article.remove({ _id: req.params.postId });
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
//updating single article by id
router.patch("/:postId", async (req, res) => {
  try {
    const updatedArticle = await Article.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
module.exports = router;
