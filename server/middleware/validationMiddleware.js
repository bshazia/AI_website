const { validationResult } = require("express-validator");

const validate = (rules) => (req, res, next) => {
  // Run validation rules
  rules.forEach((rule) => rule.run(req));
  // Check results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
