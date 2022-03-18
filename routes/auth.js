const express = require("express");
const router = express.Router();

const userController = require("../controllers/auth");
const verifyFirebaseToken = require("./middlewares/verifyFirebaseToken");

router.get("/user/:userId", userController.getUserInfo);

router.post("/login", verifyFirebaseToken, userController.getLogin);

module.exports = router;
