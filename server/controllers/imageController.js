const axios = require("axios");
const fs = require("fs");
const path = require("path");
const csrf = require("csurf");

// Set up CSRF middleware
const csrfProtection = csrf({ cookie: true });

// Endpoint for image generation
const generateImage = async (req, res) => {
  const prompt = req.body.prompt || "a medieval castle on a hill"; // Get the prompt from the request
  const apiKey = process.env.OPENAI_API_KEY; // Make sure to set your OpenAI API key in .env

  const payload = {
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  };

  try {
    // Make a POST request to OpenAI's image generation API
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      payload,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        responseType: "json",
      }
    );                      
    if (response.status === 200) {
      // Extract the image URL from the response
      const imageUrl = response.data.data[0].url;

      // Download the image as a buffer
      const imageResponse = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });

      // Convert the buffer to base64
      const base64Image = Buffer.from(imageResponse.data).toString('base64');
      const imageDataUrl = `data:image/png;base64,${base64Image}`;

      res.status(200).json({
        message: "Image generated successfully",
        imageUrl: imageDataUrl, // Send base64 image data to the frontend
      });
    } else {
      res.status(response.status).json({ error: response.statusText });
    }
  } catch (error) {
    console.error("Error generating image:", error.message);
    res.status(500).json({ error: "Failed to generate image" });
  }
};

module.exports = { generateImage, csrfProtection };
