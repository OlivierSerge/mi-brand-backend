const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const Article = require("../models/articles");

router.get("/", async (req, res) => {
  try {
    // getting our article posts from Mongo
    const mongoDbArticles = await Article.find();
    res.json(mongoDbArticles);
  } catch (err) {
    res.json({ message: err });
  }
});
//submit new article post
router.post("/", async (req, res) => {
  const newArticlePost = new Article({
    title: req.body.title,
    author: req.body.author,
    File: req.body.File,
    content_type: req.body.content_type,
    details: req.body.details,
  });
  const savedPosts = await newArticlePost.save();
  try {
    res.json(savedPosts);
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
});
//getting single article by id
router.get("/:postId", async (req, res) => {
  try {
    const mySingleArticle = await Article.findById(req.params.postId);
    res.json(mySingleArticle);
  } catch (err) {
    res.json({ message: err });
  }
});
//deleting single article by id
router.delete("/:postId", async (req, res) => {
  try {
    const toDeleteArticle = await Article.remove({ _id: req.params.postId });
    res.json(toDeleteArticle);
  } catch (err) {
    res.json({ message: err });
  }
});
//updating single article by id
router.patch("/:postId", async (req, res) => {
  try {
    const updatedArticle = await Article.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
