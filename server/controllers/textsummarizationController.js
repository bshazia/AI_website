// server/controllers/summarizationController.js
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


exports.summarizeText = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [
        { role: "user", content: `Summarize the following text: ${text}` },
      ],
      max_tokens: 150,
    });

    const summary = response.choices[0].message.content.trim();
    res.json({ summary });
  } catch (error) {
    console.error("Error summarizing text:", error);
    res.status(500).json({ error: "Failed to summarize text" });
  }
};
