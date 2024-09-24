const express = require("express");
const router = express.Router();
const { generateAudiobook } = require("../controllers/audiobookController");

router.post("/generate-audiobook", generateAudiobook);

module.exports = router;
