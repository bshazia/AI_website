const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class OpenAIClient {
  async getCompletion(userInput, model = "gpt-4", maxTokens = 150) {
    try {
      const response = await openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant with detailed and accurate information. Provide responses as if you were ChatGPT. If you need to provide additional context or clarifications, do so in a user-friendly manner.`,
          },
          { role: "user", content: userInput },
        ],
        max_tokens: maxTokens,
        temperature: 0.7, // Adjust the temperature for a more natural response
        top_p: 1.0, // Consider using top_p for better diversity
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error(`Error in OpenAI API call: ${error.message}`);
      throw new Error("Failed to get completion from OpenAI");
    }
  }
}

const openaiClient = new OpenAIClient();

const chat = async (req, res) => {
  const userInput = req.body.message;

  try {
    const message = await openaiClient.getCompletion(userInput);
    res.json({ message: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  chat,
};
