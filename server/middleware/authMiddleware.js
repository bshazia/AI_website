const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { body, validationResult } = require("express-validator");
const { isTokenBlacklisted } = require("../controllers/authController"); // Import the function

// Validation rules for registration
const registerRules = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Validation handler middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Updated authenticateToken function with token blacklisting check
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Check if the token is blacklisted
    const isBlacklisted = await isTokenBlacklisted(token);
    if (isBlacklisted) {
      return res.status(401).json({ error: "Token has been blacklisted" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = {
  registerRules,
  validate,
  authenticateToken,
};
