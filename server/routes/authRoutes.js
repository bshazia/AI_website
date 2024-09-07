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
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const loginRules = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .exists()
    .withMessage("Password is required"),
];

// Routes
router.post(
  "/register",
  validate(registerRules),
  sanitize,
  authController.register
);
router.post("/login", validate(loginRules), sanitize, authController.login);

router.post("/logout", authController.logout);


module.exports = router;
