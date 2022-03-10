const createError = require("http-errors");

const makeAPlanService = require("../services/makeAPlan");

exports.checkEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await makeAPlanService.checkUserEmail(email);

    if (!user) {
      res.status(400).json({
        result: "fail",
        error: {
          message: "Not Found Email",
        },
      });

      return;
    }

    res.json({
      result: "success",
      data: {
        userId: user._id,
        name: user.name,
      },
    });
  } catch (err) {
    next(createError(500, "Invalid Server Error"));
  }
};
