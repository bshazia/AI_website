import axios from "axios";

// Fetch CSRF token function
export const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/get-csrf-token`,
      { withCredentials: true }
    );
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw error;
  }
};

// Summarize video text
export const summarizeText = async (videoUrl, summaryType, csrfToken) => {
  try {
    const maxTokens = summaryType === "short" ? 150 : 400;
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/summarize`,
      { videoUrl, maxTokens },
      {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        withCredentials: true,
      }
    );
    return response.data.summary;
  } catch (error) {
    console.error("Error summarizing text:", error);
    throw error;
  }
};
