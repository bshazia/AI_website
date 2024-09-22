const axios = require("axios");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const { PassThrough } = require("stream");

const transcribeAudioStream = (videoUrl) => {
  return new Promise((resolve, reject) => {
    try {
      const audioStream = ytdl(videoUrl, { filter: "audioonly" });

      audioStream.on("error", (err) => {
        console.error(
          `Error fetching audio stream from ${videoUrl}:`,
          err.message
        );
        reject(`Error during audio extraction: ${err.message}`);
      });

      const command = ffmpeg(audioStream)
        .noVideo()
        .format("mp3")
        .on("error", (err) => {
          console.error(`FFmpeg error processing audio:`, err.message);
          reject(`Error during audio processing: ${err.message}`);
        })
        .pipe(new PassThrough(), { end: true });

      transcribeAudioFromStream(command)
        .then(resolve)
        .catch((err) => {
          console.error(`Error during transcription:`, err.message);
          reject(err);
        });
    } catch (err) {
      console.error(`Error starting audio extraction:`, err.message);
      reject(`Error starting audio extraction: ${err.message}`);
    }
  });
};

const transcribeAudioFromStream = async (audioStream) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      audioStream,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "audio/mpeg",
        },
        maxContentLength: Infinity,
        responseType: "json",
        timeout: 30000,
      }
    );

    return response.data.text;
  } catch (error) {
    console.error("Error during audio transcription:", error.message);
    throw new Error("Failed to transcribe audio");
  }
};

module.exports = { transcribeAudioStream };
