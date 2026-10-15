const router = require("express").Router();
const authController = require("../services/auth.controller");

const authTokenMiddleware = require("../middlewares/authToken.middleware");
const { registerValidationRules, loginValidationRules } = require("../validators/auth.validator");

router.post("/register", registerValidationRules, authController.registerUser);
router.post("/login", loginValidationRules, authController.loginUser); 

router.get("/profile", authTokenMiddleware, authController.getUserProfile);

module.exports = router;