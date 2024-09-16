// services/textSummarizationService.js
import axios from "axios";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

export const summarizeText = async (text, length = "short") => {
  try {
    const prompt = `Summarize the following text in a ${
      length === "short" ? "brief" : "detailed"
    } manner:\n\n${text}`;

    // Call OpenAI API for summarization
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003", // You can use "gpt-3.5-turbo" or any other suitable model
        prompt,
        max_tokens: length === "short" ? 150 : 400,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const summary = response.data.choices[0].text.trim();
    return summary;
  } catch (error) {
    console.error("Error summarizing text:", error);
    throw error;
  }
};
