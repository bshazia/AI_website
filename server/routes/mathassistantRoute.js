const express = require("express");
const router = express.Router();
const openai = require("../controllers/mathassistantController");

router.post("/ask-math-teacher", openai.askMathTeacher);

module.exports = router;
