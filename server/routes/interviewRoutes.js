// server/routes/interviewRoutes.js
const express = require("express");
const csrfMiddleware = require("../middleware/csrfProtection");
const { authenticateToken } = require("../middleware/authMiddleware");

const {
  getInterviewQuestions,
  getInterviewFeedback,
} = require("../controllers/interviewController");

const router = express.Router();

// Define routes and delegate logic to controllers
router.get("/questions",  getInterviewQuestions);
router.post("/feedback", authenticateToken, getInterviewFeedback);

module.exports = router;