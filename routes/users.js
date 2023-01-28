const { json } = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const { loginValidation, signUpValidation } = require("./validations");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const authorize = require("../routes/verify");

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: err });
  }
});

router.post("/signUp", async (req, res) => {
  // validate before
  const { error } = signUpValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // check if info already exusts in DB
  const isUserNew = await Users.findOne({ username: req.body.username });
  if (!isUserNew)
    return res.status(400).send("username already exists try changing it");

  // add new user if hshe's valid
  const user = new Users({
    username: req.body.username,
    password: req.body.password,
  });
  if (!user.username || !user.password) {
    return res.status(400).send("Username and password are required.");
  }
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;

  const dbstored = await user.save();
  res.status(200).json(user);
});
// login
router.post("/:login", authorize, async (req, res) => {
  // validate user inputs beforehand
  const user = req.body;
  const { error } = loginValidation(user);
  if (error) return res.status(400).send(error.details[0].message);
  //check if user exists
  const foundUser = await Users.findOne({ username: req.body.username });
  if (!foundUser) {
    const err = new Error("Invalid username or password");
    return res.status(400).json({ message: err });
  }
  //check if password is correct
  const isPasswordValid = await bcrypt.compare(
    user.password,
    foundUser.password
  );

  if (!isPasswordValid) {
    return res.status(400).send("Invalid username or password");
  }
  //create token
  const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
    // expiresIn: "1h",
  });
  res.header("auth-token", token).json({ token });
  // res
  // .status(200)
  // .send("welcome," + user.username + ",your Login request is successful");
});
//getting single user by id
router.get("/:userId", async (req, res) => {
  try {
    const singleUser = await Users.findById(req.params.userId);

    res.status(200).json(singleUser);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
//deleting single user by id
router.delete("/:userId", async (req, res) => {
  try {
    const aUser = await Users.findOne({ _id: req.params.postId });
    if (!aUser) {
      return next();
    }
    const toDeleteUser = await Users.remove({ _id: req.params.userId });
    res.status(200).json(toDeleteUser);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
//updating single user by id
router.patch("/:userId", authorize, async (req, res) => {
  try {
    const updatedArticle = await Users.updateOne(
      { _id: req.params.userId },
      { $set: { title: req.body.title } }
    );
    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
module.exports = router;
