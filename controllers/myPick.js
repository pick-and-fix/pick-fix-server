const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const createError = require("http-errors");

const myPickService = require("../services/myPick");
const { RESULT_MESSAGE, ERROR_MESSAGE } = require("../constants/response");

exports.getMyPicks = async (req, res, next) => {
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

    const picks = await myPickService.getPicks(userId);

    res.json({
      result: RESULT_MESSAGE.success,
      data: picks,
    });
  } catch (err) {
    next(createError(500, ERROR_MESSAGE.invalidServerError));
  }
};

exports.saveNewMyPick = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { newPick } = req.body;

    if (!ObjectId.isValid(userId)) {
      res.status(400).json({
        result: RESULT_MESSAGE.fail,
        error: {
          message: ERROR_MESSAGE.notValidObject,
        },
      });

      return;
    }

    const savedNewPick = await myPickService.saveNewPick({ userId, newPick });

    res.json({
      result: RESULT_MESSAGE.success,
      data: savedNewPick,
    });
  } catch (err) {
    next(createError(500, ERROR_MESSAGE.invalidServerError));
  }
};
