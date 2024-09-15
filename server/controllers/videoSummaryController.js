const { getCaptions, summarizeText } = require("../utils/summarizationUtils");

exports.summarizeVideo = async (req, res) => {
  const { youtubeVideoUrl, typeOfSummary } = req.body;

  try {
    // Fetch video captions
    const captions = await getCaptions(youtubeVideoUrl);

    // If no captions are available, prompt user to provide a different link
    if (!captions) {
      return res.status(400).json({
        error:
          "No transcript found for this video. Please provide a link to a video with captions.",
      });
    }

    // Summarize the available captions
    const summary = await summarizeText(captions, typeOfSummary);
    res.json({ summary });
  } catch (error) {
    console.error("Error summarizing video:", error);
    res.status(500).json({
      error:
        "An error occurred while summarizing the video. Please try again later.",
    });
  }
};
