const { getCaptions, summarizeText } = require("../utils/summarizationUtils");
// const { transcribeAudioStream } = require("../utils/transcriptionUtils");

exports.summarizeVideo = async (req, res) => {
  const { youtubeVideoUrl, typeOfSummary } = req.body;

  try {
    // Fetch video captions
    let captions = await getCaptions(youtubeVideoUrl);

    // If no captions are available, fall back to audio transcription
    if (!captions) {
      captions = await transcribeAudioStream(youtubeVideoUrl);
      if (!captions) {
        return res.status(400).json({
          error:
            "No transcript or captions found for this video. Please provide a valid video with subtitles or clear audio.",
        });
      }
    }

    // Summarize the available captions or transcription
    const summary = await summarizeText(captions, typeOfSummary);
    res.json({ summary });
  } catch (error) {
    console.error("Error summarizing video:", error.message);
    res.status(500).json({
      error:
        "An error occurred while summarizing the video. Please try again later.",
    });
  }
};
