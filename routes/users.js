const express = require("express");
const router = express.Router();

const verifyToken = require("../routes/middlewares/verifyToken");
const planListController = require("../controllers/planList");
const myPickController = require("../controllers/myPick");
const makeAPlanController = require("../controllers/makeAPlan");
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
module.exports = router;
