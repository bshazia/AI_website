// services/textSummarizationService.js
import { pipeline } from "@huggingface/transformers";

const summarizer = pipeline("summarization");

export const summarizeText = async (text, length = "short") => {
  try {
    const summary = await summarizer(text, {
      max_length: length === "short" ? 150 : 400,
    });
    return summary[0].summary_text;
  } catch (error) {
    console.error("Error summarizing text:", error);
    throw error;
  }
};
