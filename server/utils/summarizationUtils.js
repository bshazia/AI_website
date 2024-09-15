const { OpenAI } = require("openai");
const ytdl = require("ytdl-core");
const axios = require("axios");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to check for available captions (subtitles) for the video
async function getCaptions(videoUrl) {
  const info = await ytdl.getInfo(videoUrl);
  const tracks =
    info.player_response.captions?.playerCaptionsTracklistRenderer
      ?.captionTracks;

  if (tracks && tracks.length) {
    const captionUrl = tracks[0].baseUrl; // First available caption track
    const { data: captions } = await axios.get(captionUrl); // Fetch captions
    return captions;
  } else {
    return null; // No captions available
  }
}

// Summarize text using OpenAI API
async function summarizeText(text, summaryType) {
  // Limit the length of text to avoid long processing time
  const maxLength = 5000;
  const trimmedText = text.length > maxLength ? text.slice(0, maxLength) : text;

  const chunks = splitTextIntoChunks(trimmedText);
  const chunkSummaries = [];

  for (const chunk of chunks) {
    const summary = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "user",
          content: `Generate a ${summaryType.toLowerCase()} summary of the following text:\n${chunk}`,
        },
      ],
      max_tokens: summaryType.toLowerCase() === "detailed" ? 1000 : 100,
      temperature: 0.7,
    });
    chunkSummaries.push(summary.choices[0].message.content);
  }

  return chunkSummaries.join(" ");
}

function splitTextIntoChunks(text, chunkSize = 2048) {
  const words = text.split(" ");
  return words
    .reduce(
      (chunks, word) => {
        const lastChunk = chunks[chunks.length - 1];
        if (lastChunk.length + word.length > chunkSize) {
          chunks.push(word);
        } else {
          lastChunk.push(word);
        }
        return chunks;
      },
      [[]]
    )
    .map((chunk) => chunk.join(" "));
}

module.exports = {
  getCaptions,
  summarizeText,
  splitTextIntoChunks,
};
