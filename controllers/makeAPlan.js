const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const createError = require("http-errors");

const makeAPlanService = require("../services/makeAPlan");
const { RESULT_MESSAGE, ERROR_MESSAGE } = require("../constants/response");

exports.checkEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await makeAPlanService.checkUserEmail(email);

    if (!user) {
      res.status(400).json({
        result: RESULT_MESSAGE.fail,
        error: {
          message: ERROR_MESSAGE.notFoundEmail,
        },
      });

      return;
    }

    res.json({
      result: RESULT_MESSAGE.success,
      data: {
        userId: user._id,
        name: user.name,
      },
    });
  } catch (err) {
    next(createError(500, ERROR_MESSAGE.invalidServerError));
  }
};

exports.createNewPlan = async (req, res, next) => {
  const { userId } = req.params;
  const { newPlan } = req.body;

  try {
    if (!ObjectId.isValid(userId)) {
      res.status(400).json({
        result: RESULT_MESSAGE.fail,
        error: {
          message: ERROR_MESSAGE.notValidObject,
        },
      });

      return;
    }

    await makeAPlanService.saveNewPlan({
      userId,
      newPlan,
    });

    res.json({
      result: RESULT_MESSAGE.success,
    });
  } catch (err) {
    next(createError(500, ERROR_MESSAGE.invalidServerError));
  }
};
