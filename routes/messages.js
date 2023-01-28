const { json } = require("body-parser");
const express = require("express");

const router = express.Router();
const Messages = require("../models/messages");
const { contactUsValidation } = require("./validations");

router.get("/", async (req, res) => {
  try {
    // getting our message posts from Mongo
    const mongoDbMessages = await Messages.find();
    res.status(200).json(mongoDbMessages);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
//submit new messaget
router.post("/", async (req, res) => {
  // validate the user inputs before adding them into the database
  const { error } = contactUsValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // find if the user doesn't exist first
  const findInDb = await Messages.findOne({ message: req.body.message });
  // check if user exixts
  if (findInDb) {
    res.status(400);
    const error = new Error("this  exists");
    return next(error);
  }
  try {
    // adding new message
    const newMessagePost = new Messages({
      name: req.body.name,
      email: req.body.email,
      adress: req.body.adress,
      message: req.body.message,
    });
    const savedMessages = await newMessagePost.save();

    res.status(200).json({ message: "submit went succesfully", savedMessages });
  } catch (err) {
    res.status(400).json({ message: err });
    console.log(err);
  }
});
//getting single client inquiry by id
router.get("/:messagesId", async (req, res) => {
  try {
    const oneClientMessage = await Messages.findById(req.params.messagesId);
    res.status(200).json({ message: "success", oneClientMessage });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
//deleting single article by id
router.delete("/:messagesId", async (req, res) => {
  try {
    const myMessage = await Messages.findOne({ _id: req.params.postId });
    if (!myMessage) {
      return next();
    }
    const toDeleteOneClientMsg = await Messages.remove({
      _id: req.params.messagesId,
    });
    res
      .status(200)
      .json({ message: "deletion went succesfullly", toDeleteOneClientMsg });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
//updating single article by id
router.patch("/:messagesId", async (req, res) => {
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
    const upToDate = await Messages.findOne({ _id: req.params.messagesId });
    res.status(200).json({ message: "message updated", upToDate });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
module.exports = router;
