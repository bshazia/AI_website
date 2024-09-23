// src/middleware/validation.js

const { check, validationResult } = require("express-validator");

// Validation rules for sentiment analysis
const sentimentValidationRules = [
  check("text")
    .isString()
    .withMessage("Text must be a string")
    .notEmpty()
    .withMessage("Text cannot be empty")
    .trim()
    .escape(),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { sentimentValidationRules, validateRequest };
