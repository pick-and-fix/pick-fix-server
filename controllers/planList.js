const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const createError = require("http-errors");

const planListService = require("../services/planList");
const { RESULT_MESSAGE, ERROR_MESSAGE } = require("../constants/response");

exports.getPlanList = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!ObjectId.isValid(userId)) {
      res.status(400).json({
        result: RESULT_MESSAGE.fail,
        error: {
          message: ERROR_MESSAGE.notValidObject,
        },
      });

      return;
    }

    const plans = await planListService.getPlans(userId);

    res.json({
      result: RESULT_MESSAGE.success,
      data: plans,
    });
  } catch (err) {
    next(createError(500, ERROR_MESSAGE.invalidServerError));
  }
};
