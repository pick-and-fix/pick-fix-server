const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const createError = require("http-errors");

const myPickService = require("../services/myPick");

exports.getMyPicks = async (req, res, next) => {
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

    const picks = await myPickService.getPicks(userId);

    res.json({
      result: "success",
      data: picks,
    });
  } catch (err) {
    next(createError(500, "Invalid Server Error"));
  }
};
