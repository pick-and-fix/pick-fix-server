const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const createError = require("http-errors");

const planListService = require("../services/planList");

exports.getPlanList = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!ObjectId.isValid(userId)) {
      res.status(400).json({
        result: "fail",
        error: {
          message: "Not Valid ObjectId",
        },
      });

      return;
    }

    const plans = await planListService.getPlans(userId);

    res.json({
      result: "success",
      data: plans,
    });
  } catch (err) {
    next(createError(500, "Invalid Server Error"));
  }
};
