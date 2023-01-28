const express = require("express");
const app = express();
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const cors = require("cors");


// ROUTES
const articlesRoutes = require("./routes/articles");
const messagesRoutes = require("./routes/messages");
const usersRoute = require("./routes/users");
// const {
//   articleValidation,
//   userValidation,
//   contactUsValidation,
// } = require("./routes/validations");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/articles", articlesRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", usersRoute);

app.get("/api", (req, res) => {
  res.send("we are on homePage");
  console.log("hello");
});
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("connected to DB")
);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`started executing on port ${port}`));


module.exports=app