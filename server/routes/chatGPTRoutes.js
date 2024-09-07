const express = require("express");
const router = express.Router();
const chatGPTController = require("../controllers/chatGPTController");

// Define the route
router.post("/chat", chatGPTController.chat);

module.exports = router;
