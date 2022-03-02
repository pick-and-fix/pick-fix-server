const express = require("express");
const router = express.Router();

const verifyFirebaseToken = require("../routes/middelwares/verifyFirebaseToken");
const userController = require("../controllers/users");

router.post("/login", verifyFirebaseToken, userController.getLogin);

module.exports = router;
