// server/controllers/voiceController.js

const axios = require("axios");
require("dotenv").config();

const openaiApiKey = process.env.OPENAI_API_KEY;

const textToSpeech = async (text) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/your-text-to-speech-model/generate",
      { text },
      { headers: { Authorization: `Bearer ${openaiApiKey}` } }
    );
    return response.data.audio_url;
  } catch (error) {
    console.error("Error generating speech:", error);
    throw new Error("Failed to generate speech");
  }
};

module.exports = { textToSpeech };
