// controllers/websitespeechController.js
const ttsService = require("../services/ttsService");

const readText = async (req, res) => {
  // Capture the text content from the request body
  const { text, voiceType } = req.body; // Ensure `text` is being sent in the request body

  // Check if text is provided
  if (!text) {
    return res.status(400).json({ message: "Text input is required" });
  }

  try {
    const audioBuffer = await ttsService.generateSpeech(text, voiceType);

    // Convert audioBuffer to base64
    const audioBase64 = audioBuffer.toString("base64");
    res.json({ audio: audioBase64 }); // Send as JSON response
  } catch (error) {
    console.error("Error in readText controller:", error);
    res.status(500).json({ message: "Error processing text-to-speech" });
  }
};

module.exports = { readText };
