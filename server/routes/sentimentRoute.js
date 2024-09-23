// src/routes/sentimentRoute.js

const express = require("express");
const { analyzeSentiment } = require("../services/sentimentService");

const router = express.Router();

// POST /api/sentiment
router.post("/sentiment", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  const sentimentResult = analyzeSentiment(text);
  res.json(sentimentResult);
});

module.exports = router;
