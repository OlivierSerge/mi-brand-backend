const mongoose = require("mongoose");
const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min:7,

  },
  password: {
    type: String,
    required: true,
  },
 
});
module.exports = mongoose.model("users", usersSchema);
