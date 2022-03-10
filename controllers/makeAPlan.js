const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
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

exports.createNewPlan = async (req, res, next) => {
  const { userId } = req.params;
  const { newPlan } = req.body;

  try {
    if (!ObjectId.isValid(userId)) {
      res.status(400).json({
        result: "fail",
        error: {
          message: "Not Valid ObjectId",
        },
      });

      return;
    }

    await makeAPlanService.saveNewPlan({
      userId,
      newPlan,
    });

    res.json({
      result: "success",
    });
  } catch (err) {
    next(createError(500, "Invalid Server Error"));
  }
};
