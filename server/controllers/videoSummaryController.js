const {
  getCaptions,
  summarizeCaptions,
} = require("../utils/summarizationUtils");

exports.summarizeVideo = async (req, res) => {
  try {
    const { videoUrl, summaryType = "concise" } = req.body; // Added default summaryType if not provided
    console.log("Received video URL:", videoUrl);

    const captions = await getCaptions(videoUrl);
    if (captions) {
      const summary = await summarizeCaptions(captions, summaryType); // Pass summaryType to summarizeCaptions
      return res.status(200).json({ summary });
    } else {
      return res
        .status(404)
        .json({ message: "No captions available for this video." });
    }
  } catch (error) {
    console.error("Error summarizing video:", error);
    return res.status(400).json({ message: error.message });
  }
};
