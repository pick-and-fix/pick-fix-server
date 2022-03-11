const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const createError = require("http-errors");

const voteService = require("../services/vote");

exports.getVoteList = async (req, res, next) => {
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

    const votes = await voteService.getVotes(userId);

    res.json({
      result: "success",
      data: votes,
    });
  } catch (err) {
    next(createError(500, "Invalid Server Error"));
  }
};

exports.getPicks = async (req, res, next) => {
  try {
    const { userId, planId } = req.params;

    if (!ObjectId.isValid(userId)) {
      res.status(400).json({
        result: "fail",
        error: {
          message: "Not Valid ObjectId",
        },
      });

      return;
    }

    if (!ObjectId.isValid(planId)) {
      res.status(400).json({
        result: "fail",
        error: {
          message: "Not Valid ObjectId",
        },
      });

      return;
    }

    const picks = await voteService.getAllPick({ userId, planId });

    res.json({
      result: "success",
      data: picks,
    });
  } catch (err) {
    next(createError(500, "Invalid Server Error"));
  }
};
