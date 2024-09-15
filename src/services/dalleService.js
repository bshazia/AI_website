import axios from "axios";

const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

export const generateDalleImage = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt,
        n: 1,
        size: "1024x1024",
      },
      {
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    return response.data.data[0].url;
  } catch (error) {
    console.error("Error generating image from DALL-E:", error);
    throw error;
  }
};
