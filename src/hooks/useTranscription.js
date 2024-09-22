import { useState } from "react";
import { transcribeVideo } from "../services/transcriptionService";

const useTranscription = () => {
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTranscription = async (videoUrl) => {
    setLoading(true);
    setError(null);
    try {
      const result = await transcribeVideo(videoUrl);
      setTranscription(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { transcription, loading, error, handleTranscription };
};

export default useTranscription;
