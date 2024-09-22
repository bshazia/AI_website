const express = require("express");
const videoController = require("../controllers/videoController");

const router = express.Router();

router.post(
  "/transcribe",
  videoController.summarizeVideo
);

module.exports = router;
