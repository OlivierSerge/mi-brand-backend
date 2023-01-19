const { json } = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
// const joi = require("joi");
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
  const user = req.body;
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
});
module.exports = router;
