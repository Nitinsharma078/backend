const express = require("express");
const authController = require("./auth.controller");
const registerSchema  = require("./auth.validation")
const router = express.Router();
const validate = require("../../middleware/validate.middleware");

router.post("/register", validate(registerSchema.registerSchema), authController.register);
router.post("/login", validate(registerSchema.loginSchema), authController.login);

module.exports = router;