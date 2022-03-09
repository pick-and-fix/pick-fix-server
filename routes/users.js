const express = require("express");
const router = express.Router();

const verifyToken = require("../routes/middlewares/verifyToken");
const planListController = require("../controllers/planList");
const myPickController = require("../controllers/myPick");

router.get("/:userId/planlist", verifyToken, planListController.getPlanList);
router.get("/:userId/mypick", verifyToken, myPickController.getMyPicks);
router.post("/:userId/mypick/new", verifyToken, myPickController.saveNewMyPick);

module.exports = router;
