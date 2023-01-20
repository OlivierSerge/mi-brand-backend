const { json } = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const { loginValidation, signUpValidation } = require("./validations");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    res.json({ message: err });
  }
});

router.post("/signUp", async (req, res) => {
  // validate before
  const { error } = signUpValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
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
  res.json(user);
});
// login
router.post("/:login", async (req, res) => {
  // validate user inputs beforehand
  const user = req.body;
  const { error } = loginValidation(user);
  if (error) return res.status(400).send(error.details[0].message);
  //check if user exists
  const foundUser = await Users.findOne({ username: req.body.username });
  if (!foundUser) {
    return res.status(400).send("Invalid username or password");
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
    expiresIn: "1h",
  });
  res.header("auth-token", token).json({ token });
  res.status(200).send("user logged in succesfully");
});
//getting single user by id
router.get("/:userId", async (req, res) => {
  try {
    const singleUser = await Article.findById(req.params.userId);
    res.json(singleUser);
  } catch (err) {
    res.json({ message: err });
  }
});
//deleting single user by id
router.delete("/:userId", async (req, res) => {
  try {
    const toDeleteUser = await Article.remove({ _id: req.params.userId });
    res.json(toDeleteUser);
  } catch (err) {
    res.json({ message: err });
  }
});
//updating single user by id
router.patch("/:userId", async (req, res) => {
  try {
    const updatedArticle = await Article.updateOne(
      { _id: req.params.userId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
