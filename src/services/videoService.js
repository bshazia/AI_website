// src/services/videoService.js
import axios from "axios";

export const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/get-csrf-token`,
      { withCredentials: true }
    );
    return response.data.csrfToken;
  } catch (err) {
    console.error("Failed to fetch CSRF token:", err);
    throw err;
  }
};

export const summarizeVideo = async (videoUrl, summaryType, csrfToken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/summarize`,
      {
        youtubeVideoUrl: videoUrl,
        typeOfSummary: summaryType,
      },
      {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        withCredentials: true,
      }
    );
    return response.data.summary;
  } catch (err) {
    console.error("Error summarizing video:", err);
    throw err;
  }
};
