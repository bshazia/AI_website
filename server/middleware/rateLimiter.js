const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30, // Limit each IP to 30 requests per `window` (5 minutes)
  message: "Too many requests from this IP, please try again later.",
});

module.exports = apiLimiter;
