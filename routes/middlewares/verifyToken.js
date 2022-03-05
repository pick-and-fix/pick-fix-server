const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const accessToken = req.headers.authorization.split("Bearer ")[1];

  try {
    jwt.verify(accessToken, process.env.SECRET_KEY);

    next();
  } catch (err) {
    if (err.message === "jwt expired") {
      res.status(400).json({
        result: "fail",
        error: {
          message: "Token is expired",
        },
      });

      return;
    }

    if (err.message === "invalid token") {
      res.status(400).json({
        result: "fail",
        error: {
          message: "invalid Verify Token",
        },
      });

      return;
    }
  }
};

module.exports = verifyToken;
