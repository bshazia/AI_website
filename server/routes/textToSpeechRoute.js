const express = require("express");
const { generateSpeech } = require("../controllers/texttospeechController");
const { csrfProtection } = require("../middleware/csrfProtection");

const router = express.Router();

// Text-to-Speech endpoint
router.post("/generate-speech", csrfProtection, generateSpeech);

module.exports = router;
