// server/services/sentimentService.js

const Sentiment = require("sentiment");
const sentiment = new Sentiment();

/**
 * Analyzes the sentiment of the input text
 * @param {string} text - The text to analyze
 * @returns {object} - Sentiment analysis result
 */
const analyzeSentiment = (text) => {
  const result = sentiment.analyze(text);
  return result;
};

module.exports = { analyzeSentiment };
