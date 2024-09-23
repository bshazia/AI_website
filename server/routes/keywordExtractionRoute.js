const express = require("express");
const {
  extractKeywords,
} = require("../controllers/keywordExtractionController");

const router = express.Router();

router.post("/extract-keywords", extractKeywords);

module.exports = router;
