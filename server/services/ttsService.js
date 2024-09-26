// services/ttsService.js
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your OpenAI API key is correctly set
});

const generateSpeech = async (text, voiceType) => {
  try {
    // Use the appropriate method from OpenAI for TTS
    const model = "tts-1-hd"; // Specify your TTS model here
    const voice = voiceType || "alloy"; // Default to "alloy" if voiceType is not provided

    const mp3 = await openai.audio.speech.create({
      model: model,
      voice: voice,
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return buffer; // Return the audio buffer for further processing
  } catch (error) {
    console.error("Error generating speech:", error);
    throw new Error("Failed to generate speech");
  }
};

module.exports = { generateSpeech };
