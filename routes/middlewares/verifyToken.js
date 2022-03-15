const jwt = require("jsonwebtoken");

const {
  ERROR_MESSAGE,
  RESULT_MESSAGE,
  ERROR_TYPE,
} = require("../../constants/response");

const verifyToken = (req, res, next) => {
  const accessToken = req.headers.authorization.split("Bearer ")[1];

  try {
    jwt.verify(accessToken, process.env.SECRET_KEY);

    next();
  } catch (err) {
    if (err.message === ERROR_TYPE.expiredJWT) {
      res.status(400).json({
        result: RESULT_MESSAGE.fail,
        error: {
          message: ERROR_MESSAGE.expiredJwtToken,
        },
      });

      return;
    }

    if (err.message === ERROR_TYPE.invalidJWT) {
      res.status(400).json({
        result: RESULT_MESSAGE.fail,
        error: {
          message: ERROR_MESSAGE.invalidJwtToken,
        },
      });

      return;
    }
  }
};

module.exports = verifyToken;
