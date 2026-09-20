const express = require("express");

const userController = require("./user.controller");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

router.get(
    "/me",
    authMiddleware,
    userController.getMe
);

router.get("/redis-test", authMiddleware, userController.redisTest);
module.exports = router;