// src/controllers/contentGenerationController.js
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateContent = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Specify the model you want to use
      messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({ content: response.choices[0].message.content });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Error generating content" });
  }
};
