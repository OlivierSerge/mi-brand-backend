const { json } = require("body-parser");
const express = require("express");

const router = express.Router();
const Messages = require("../models/messages");


router.get("/", async (req, res) => {
  try {
    // getting our article posts from Mongo
    const mongoDbMessages = await Messages.find();
    res.json(mongoDbMessages);
  } catch (err) {
    res.json({ message: err });
  }
});
//submit new messaget
router.post("/", async (req, res) => {
  
  const newMessagePost = new Messages({
    name: req.body.name,
    email: req.body.email,
    adress: req.body.adress,
    message: req.body.message,
  });
  const savedMessages = await newMessagePost.save();
  try {
    res.json(savedMessages);
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
});
//getting single client inquiry by id
router.get("/:messageId", async (req, res) => {
  try {
    const oneClientMessage = await Messages.findById(req.params.messageId);
    res.json(oneClientMessage);
  } catch (err) {
    res.json({ message: err });
  }
});
//deleting single article by id
router.delete("/:postId", async (req, res) => {
  try {
    const toDeleteOneClientMsg = await Messages.remove({
      _id: req.params.messagesId,
    });
    res.json(toDeleteOneClientMsg);
  } catch (err) {
    res.json({ message: err });
  }
});
//updating single article by id
router.patch("/:postId", async (req, res) => {
  try {
    const updatedMessage = await Messages.updateOne(
      { _id: req.params.messagesId },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          adress: req.body.adress,
          message: req.body.message,
        },
      }
    );
    res.json(updatedMessage);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
