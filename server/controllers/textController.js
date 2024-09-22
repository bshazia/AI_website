const { generateOpenAISummary } = require("../utils/openaiUtils");

const summarizeText = async (req, res) => {
  const { text, maxTokens } = req.body;

  try {
    const summary = await generateOpenAISummary(text, maxTokens);
    res.json({ summary });
  } catch (error) {
    console.error("Error summarizing text:", error);
    res.status(500).json({ error: "Failed to summarize text" });
  }
};

module.exports = { summarizeText };
