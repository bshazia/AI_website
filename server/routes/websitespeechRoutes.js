// routes/websitespeechRoutes.js
const express = require("express");
const router = express.Router();
const { readText } = require("../controllers/speechController");
const { csrfProtection } = require("../middleware/csrf");

router.post("/read-text", csrfProtection, readText);

module.exports = router;
