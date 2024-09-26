// routes/websitespeechRoutes.js
const express = require("express");
const router = express.Router();
const { readText } = require("../controllers/websitespeechController");
const { csrfProtection } = require("../middleware/csrfProtection");

router.post("/read-text", csrfProtection, readText);

module.exports = router;
