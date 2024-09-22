// src/hooks/useVideoSummarization.js
import { useState, useEffect } from "react";
import {
  fetchCsrfToken,
  summarizeText,
} from "../services/textSummarizationService";

export const useVideoSummarization = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [summaryType, setSummaryType] = useState("Detailed");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    // Fetch CSRF token only once on component mount
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
    if (!videoUrl) {
      setError("Please enter a valid video URL.");
      return;
    }

    setIsLoading(true);
    setSummary("");
    setError("");

    try {
      const summaryResult = await summarizeText(
        videoUrl,
        summaryType,
        csrfToken
      );
      setSummary(summaryResult);
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
