const mongoose = require("mongoose");
const Joi = require("joi");
const messageSchema = mongoose.Schema({
  name: {
    type: String,
    min: 3,
    max: 10,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    min: 3,
    max: 10,
    required: true,
  },
  message: {
    type: String,
    min: 10,
    max: 500,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("messages", messageSchema);
