import axios from "axios";
axios.defaults.withCredentials = true;

// Fetch CSRF token from your server if needed
const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-csrf-token`);
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
};
// Transcribe YouTube video by making an API call
export const transcribeVideo = async (videoUrl,) => {
  try {
        const csrfToken = await fetchCsrfToken();

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/transcribe`,
      { youtube_video_url: videoUrl },
      {
        headers: {
          "X-CSRF-Token": csrfToken, // Include the CSRF token in the headers
        },
      }
    );
    return response.data.transcription;
  } catch (error) {
    throw new Error("Error transcribing video:", error);
  }
};
