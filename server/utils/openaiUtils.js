const axios = require("axios");

const openaiApiKey = process.env.OPENAI_API_KEY;

const generateOpenAISummary = async (text, maxTokens = 150) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: `Summarize the following text: ${text}`,
        max_tokens: maxTokens,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error generating summary from OpenAI:", error);
    throw error;
  }
};

module.exports = { generateOpenAISummary };
