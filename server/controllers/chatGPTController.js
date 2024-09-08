const { OpenAI } = require("openai");
// const config = require("../config/config");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class OpenAIClient {
  async getCompletion(
    prompt,
    model = "gpt-4",
    maxTokens = 150,
  ) {
    try {
      const response = await openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: "system",
            content: `You are a professional consultant providing detailed responses with video links and step-by-step instructions.`,
          },
          { role: "user", content: prompt },
        ],
        max_tokens: maxTokens,
        temperature: 0.3,
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
    const prompt = `Respond to ${userInput}`;
    const message = await openaiClient.getCompletion(prompt);
    res.json({ message: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  chat,
};
