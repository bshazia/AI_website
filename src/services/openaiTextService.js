// services/openaiService.js
import axios from "axios";


const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;


export const generateOpenAISummary = async (text, maxTokens = 150) => {
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
