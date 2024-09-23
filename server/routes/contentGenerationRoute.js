const express = require("express");
const {
  generateContent,
} = require("../controllers/contentGenerationController");
const router = express.Router();

router.post("/generate-content", generateContent);

module.exports = router;
