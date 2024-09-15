// server/routes/summarizationRoutes.js
const express = require("express");
const router = express.Router();
const { summarizeVideo } = require("../controllers/videoSummaryController");

router.post("/summarize", summarizeVideo);

module.exports = router;
