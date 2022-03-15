const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const createError = require("http-errors");

const voteService = require("../services/vote");
const {
  RESULT_MESSAGE,
  ERROR_MESSAGE,
  DATA_MESSAGE,
} = require("../constants/response");

exports.getVoteList = async (req, res, next) => {
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

    const votes = await voteService.getVotes(userId);

    res.json({
      result: RESULT_MESSAGE.success,
      data: votes,
    });
  } catch (err) {
    next(createError(500, ERROR_MESSAGE.invalidServerError));
  }
};

exports.getPicks = async (req, res, next) => {
  try {
    const { userId, planId } = req.params;

    if (!ObjectId.isValid(userId) || !ObjectId.isValid(planId)) {
      res.status(400).json({
        result: RESULT_MESSAGE.fail,
        error: {
          message: ERROR_MESSAGE.notValidObject,
        },
      });

      return;
    }

    const picks = await voteService.getAllPick({ userId, planId });

    res.json({
      result: RESULT_MESSAGE.success,
      data: picks,
    });
  } catch (err) {
    next(createError(500, ERROR_MESSAGE.invalidServerError));
  }
};

exports.savePickVote = async (req, res, next) => {
  try {
    const { userId, planId } = req.params;
    const { vote } = req.body;

    if (!ObjectId.isValid(userId) || !ObjectId.isValid(planId)) {
      res.status(400).json({
        result: RESULT_MESSAGE.fail,
        error: {
          message: ERROR_MESSAGE.notValidObject,
        },
      });

      return;
    }

    await voteService.saveVote({ userId, planId, vote });

    res.json({
      result: RESULT_MESSAGE.success,
    });
  } catch (err) {
    next(createError(500, ERROR_MESSAGE.invalidServerError));
  }
};

exports.getVoteResult = async (req, res, next) => {
  try {
    const { userId, planId } = req.params;

    if (!ObjectId.isValid(userId) || !ObjectId.isValid(planId)) {
      res.status(400).json({
        result: RESULT_MESSAGE.fail,
        error: {
          message: ERROR_MESSAGE.notValidObject,
        },
      });

      return;
    }

    const voteResult = await voteService.getResult(planId);

    const totalPeople = voteResult.friends.length + 1;

    if (voteResult.voting.length !== totalPeople) {
      res.json({
        result: RESULT_MESSAGE.success,
        data: DATA_MESSAGE.ongoing,
      });

      return;
    }

    if (voteResult.voting.length === totalPeople) {
      await voteService.updateVoteState(planId);

      res.json({
        result: RESULT_MESSAGE.success,
        data: voteResult.voting,
      });

      return;
    }
  } catch (err) {
    next(createError(500, ERROR_MESSAGE.invalidServerError));
  }
};

exports.saveFinalPick = async (req, res, next) => {
  try {
    const { userId, planId } = req.params;
    const { finalPicks } = req.body;

    if (!ObjectId.isValid(userId) || !ObjectId.isValid(planId)) {
      res.status(400).json({
        result: RESULT_MESSAGE.fail,
        error: {
          message: ERROR_MESSAGE.notValidObject,
        },
      });

      return;
    }

    await voteService.saveFix({ planId, finalPicks });

    res.json({
      result: RESULT_MESSAGE.success,
    });
  } catch (err) {
    next(createError(500, ERROR_MESSAGE.invalidServerError));
  }
};
