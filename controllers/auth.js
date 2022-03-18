const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const userService = require("../services/auth");
const {
  RESULT_MESSAGE,
  ERROR_MESSAGE,
  ERROR_TYPE,
} = require("../constants/response");
const { TOKEN } = require("../constants/token");

exports.getUserInfo = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const { name, email } = await userService.findUser(userId);

    res.json({
      result: RESULT_MESSAGE.success,
      data: {
        name,
        email,
      },
    });
  } catch (err) {
    next(createError(500, ERROR_MESSAGE.invalidServerError));
  }
};

exports.getLogin = async (req, res, next) => {
  const { userInfo } = res.locals;

  try {
    const { id, name, email } = await userService.createUser(userInfo);

    const accessToken = await jwt.sign(userInfo, process.env.SECRET_KEY, {
      expiresIn: TOKEN.tokenLimit,
    });

    res.json({
      result: RESULT_MESSAGE.success,
      data: {
        userId: id,
        name,
        email,
        accessToken,
      },
    });
  } catch (err) {
    if (err.name === ERROR_TYPE.validationError) {
      res.status(400).json({
        result: RESULT_MESSAGE.fail,
        error: {
          message: ERROR_MESSAGE.databaseError,
        },
      });

      return;
    }

    next(createError(500, ERROR_MESSAGE.invalidServerError));
  }
};
