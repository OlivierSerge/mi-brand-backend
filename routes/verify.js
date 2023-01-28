const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const userToken = res.header("auth-token");

  if (!userToken)
    return res.status(400).json("not authorised to perform such tasks");
  try {
    const authorized = jwt.verify(
      userToken,
      process.env.TOKEN_SECRET,
      (error, authData) => {
        if (error) {
          res.sendStatus(400);
        } else {
          res.json({
            message: "request authorized...",

            authData,
          });
        }
      }
    );
    req.user = authorized.id;
    console.log(req.user);

    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};
