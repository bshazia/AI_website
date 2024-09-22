const axios = require("axios");

const splitTextIntoChunks = (text, chunkSize = 2048) => {
  const words = text.split(" ");
  return Array.from({ length: Math.ceil(words.length / chunkSize) }, (_, i) =>
    words.slice(i * chunkSize, (i + 1) * chunkSize).join(" ")
  );
};

const summarizeText = async (text, summaryType) => {
  const chunks = splitTextIntoChunks(text);
  const chunkSummaries = [];

  for (const chunk of chunks) {
    const prompt = `Generate a ${summaryType} summary of the following text:\n${chunk}`;
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: summaryType === "detailed" ? 1000 : 100,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    chunkSummaries.push(response.data.choices[0].message.content);
  }

  return chunkSummaries.join(" ");
};

module.exports = { summarizeText };
