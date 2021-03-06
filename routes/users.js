const express = require("express");
const router = express.Router();

const verifyToken = require("../routes/middlewares/verifyToken");
const planListController = require("../controllers/planList");
const myPickController = require("../controllers/myPick");
const makeAPlanController = require("../controllers/makeAPlan");
const voteController = require("../controllers/vote");
const validator = require("./middlewares/validator");
const { checkEmailValue } = require("./middlewares/inputValidation");

router.get("/:userId/planlist", verifyToken, planListController.getPlanList);

router.get("/:userId/mypick", verifyToken, myPickController.getMyPicks);
router.post("/:userId/mypick/new", verifyToken, myPickController.saveNewMyPick);

router.post(
  "/email",
  verifyToken,
  validator(checkEmailValue),
  makeAPlanController.checkEmail
);
router.post("/:userId/plan", verifyToken, makeAPlanController.createNewPlan);

router.get("/:userId/plan/votelist", verifyToken, voteController.getVoteList);
router.get("/:userId/plan/:planId/vote", verifyToken, voteController.getPicks);
router.post(
  "/:userId/plan/:planId/vote/new",
  verifyToken,
  voteController.savePickVote
);
router.get(
  "/:userId/plan/:planId/vote/result",
  verifyToken,
  voteController.getVoteResult
);
router.post(
  "/:userId/plan/:planId/vote/fix",
  verifyToken,
  voteController.saveFinalPick
);
module.exports = router;
