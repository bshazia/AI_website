const sanitize = (req, res, next) => {
  // Perform sanitization here if needed
  next();
};

module.exports = sanitize;