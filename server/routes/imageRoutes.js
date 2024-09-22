const express = require("express");
const {
  generateImage,
  csrfProtection,
} =require("../controllers/imageController");

const router = express.Router();

// Apply CSRF protection to the route
router.post("/generate", csrfProtection, generateImage);

module.exports = router;
