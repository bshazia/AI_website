const axios = require("axios");

// Define your controller function
const generateImage = async (req, res) => {
  const { prompt } = req.body;

  try {
    const openAIResponse = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt,
        n: 1,
        size: "512x512",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const imageUrl = openAIResponse.data.data[0].url;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
};

module.exports = {
  generateImage,
};
