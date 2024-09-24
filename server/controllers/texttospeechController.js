const { createSpeech } = require("../services/openaiServicespeech");

exports.generateSpeech = async (req, res) => {
  const { text, model, voice } = req.body;

  if (!text || !model || !voice) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const audioBuffer = await createSpeech(text, model, voice);
    res.status(200).json({ audio: audioBuffer.toString("base64") });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to generate speech", details: error.message });
  }
};
