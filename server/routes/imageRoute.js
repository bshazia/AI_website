// Import necessary modules
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Environment variables for API keys (set these in a .env file)
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// Route to handle text-to-image generation
router.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  try {
    // Step 1: Call OpenAI API for image description generation
    const openAIResponse = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: `Generate an image description based on the following prompt: ${prompt}`,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const openAIResult = openAIResponse.data.choices[0].text;
    console.log("OpenAI Generated Response:", openAIResult);

    // Step 2: Send the OpenAI result back to the frontend
    res.status(200).json({ optimizedDescription: openAIResult });
  } catch (error) {
    console.error("Error in generating image description:", error);
    res.status(500).json({ error: "Error in generating image description" });
  }
});

module.exports = router;
