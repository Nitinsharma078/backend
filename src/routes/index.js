const express = require("express");
// const authRoutes = require("./modules/auth/auth.routes");
const authRoutes = require('../modules/auth/auth.routes');
const userRoutes = require("../modules/users/user.routes");
const usageRoutes = require("../modules/usage/usage.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
// router.use("/usage", usageRoutes);

module.exports = router;
