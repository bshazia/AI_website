const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middleware/validationMiddleware");
const sanitize = require("../middleware/sanitizeMiddleware");
const { body } = require("express-validator");

// Validation rules for registration and login
const registerRules = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const loginRules = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .exists()
    .withMessage("Password is required"),
];

// Validation rules for forgot password
const forgotPasswordRules = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address"),
];

// Validation rules for reset password
const resetPasswordRules = [
  body("token")
    .exists()
    .withMessage("Reset token is required"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];
// Routes
router.post( "/register", validate(registerRules),sanitize, authController.register);
router.post("/forgot-password", validate(forgotPasswordRules),sanitize,authController.forgotPassword);

router.post( "/reset-password", validate(resetPasswordRules),sanitize, authController.resetPassword);

router.post("/login", validate(loginRules), sanitize, authController.login);

router.post("/logout", authController.logout);
router.get("/verify-email", authController.verifyEmail);



module.exports = router;
