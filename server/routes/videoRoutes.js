// server/routes/videoRoutes.js
const express = require("express");
const multer = require("multer");
const videoGeneratorController = require("../controllers/videoGeneratorController");
const { csrfProtection } = require("../middleware/csrfProtection");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Video generation route
router.post(
  "/generate-gif",
  csrfProtection,
  upload.single("image"),
  videoGeneratorController.generateGif
);

module.exports = router;
