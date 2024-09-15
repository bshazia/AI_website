// src/hooks/useVideoSummarization.js
import { useState, useEffect } from "react";
import { fetchCsrfToken, summarizeVideo } from "../services/videoService";

export const useVideoSummarization = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [summaryType, setSummaryType] = useState("Detailed");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const token = await fetchCsrfToken();
        setCsrfToken(token);
      } catch (err) {
        setError("Failed to fetch CSRF token");
      }
    };

    getCsrfToken();
  }, []);

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary("");
    setError("");

    try {
      const summary = await summarizeVideo(videoUrl, summaryType, csrfToken);
      setSummary(summary);
    } catch (err) {
      setError("Failed to summarize the video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    videoUrl,
    setVideoUrl,
    summaryType,
    setSummaryType,
    summary,
    error,
    isLoading,
    handleSummarize,
  };
};
