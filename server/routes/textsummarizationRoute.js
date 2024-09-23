// server/routes/summarizationRoute.js
const express = require('express');
const { summarizeText } = require('../controllers/textsummarizationController');
const router = express.Router();

const csrfProtection = require('../middleware/csrfProtection'); // Ensure CSRF protection is applied

// POST /api/summarize
router.post('/text-summarize',  summarizeText);

module.exports = router;
