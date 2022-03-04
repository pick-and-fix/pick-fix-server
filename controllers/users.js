const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const userService = require("../services/users");

exports.getUserInfo = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const { name, email } = await userService.findUser(userId);

    res.json({
      result: "success",
      data: {
        name,
        email,
      },
    });
  } catch (err) {
    next(createError(500, "Invalid Server Error"));
  }
};

exports.getLogin = async (req, res, next) => {
  const { userInfo } = res.locals;

  try {
    const { id, name, email } = await userService.createUser(userInfo);

    const accessToken = await jwt.sign(userInfo, process.env.SECRET_KEY);

    res.json({
      result: "success",
      data: {
        userId: id,
        name,
        email,
        accessToken,
      },
    });
  } catch (err) {
    if (err.name === "validationError") {
      res.status(400).json({
        result: "fail",
        error: {
          message: "Database Error",
        },
      });
    }

    next(createError(500, "Invalid Server Error"));
  }
};
