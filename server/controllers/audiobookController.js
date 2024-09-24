const { createSpeech } = require("../services/openaiServicetts");

exports.generateAudiobook = async (req, res) => {
  const file = req.files?.file; // Ensure `req.files` exists and file is uploaded

  // Check if the file exists
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Check file size (1 MB max)
  const maxFileSize = 1 * 1024 * 1024; // 1 MB in bytes
  if (file.size > maxFileSize) {
    return res.status(400).json({ error: "File size exceeds 1 MB limit" });
  }

  // Check file type (only allow .txt and .docx)
  const allowedTypes = [
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (!allowedTypes.includes(file.mimetype)) {
    return res
      .status(400)
      .json({ error: "Only .txt and .docx file types are allowed" });
  }

  const text = file.data.toString("utf-8");

  const chunkSize = 1000; // Reduced chunk size for better API handling
  const chunks = splitTextIntoChunks(text, chunkSize);

  try {
    let audioBuffers = [];

    // Generate audio for each chunk
    for (let i = 0; i < chunks.length; i++) {
      // Directly convert text to speech without using generateText
      const audioBuffer = await createSpeech(chunks[i]);

      // Check if audioBuffer is valid and not empty
      if (!audioBuffer || audioBuffer.byteLength === 0) {
        console.error(`No audio generated for chunk ${i + 1}`);
        continue; // Skip this chunk if no audio was generated
      }

      audioBuffers.push(audioBuffer);
    }

    // Check if we have any valid audio buffers to combine
    if (audioBuffers.length === 0) {
      return res
        .status(500)
        .json({ error: "No audio generated from any chunks" });
    }

    // Combine all audio buffers into one
    const combinedBuffer = Buffer.concat(audioBuffers);

    // Return the combined audio as a base64-encoded string
    res.status(200).json({ audio: combinedBuffer.toString("base64") });
  } catch (error) {
    console.error("Error generating audiobook:", error);
    res.status(500).json({
      error: "Failed to generate audiobook",
      details: error.message,
    });
  }
};

// Helper function to split text into manageable chunks
function splitTextIntoChunks(text, chunkSize) {
  const chunks = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    chunks.push(text.slice(currentIndex, currentIndex + chunkSize));
    currentIndex += chunkSize;
  }

  return chunks;
}
