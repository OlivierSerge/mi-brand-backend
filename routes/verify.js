const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const userToken = req.headers.authorization.split(" ")[1];
  if (!userToken)
    return res.status(400).json("not authorised to perform such tasks");
  try {
    const authorized = jwt.verify(
      userToken,
      process.env.TOKEN_SECRET,
      (error, authData) => {
        if (error) {
          res
            .sendStatus(400)
            .json({ message: "not authorised to perform such tasks" });
        } else {
          req.user = authData.user;

          next();
        }
      }
    );
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
