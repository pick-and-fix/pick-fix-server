const express = require("express");
const router = express.Router();

const planListController = require("../controllers/planList");
const verifyToken = require("../routes/middlewares/verifyToken");

router.get("/:userId/planlist", verifyToken, planListController.getPlanList);

module.exports = router;
