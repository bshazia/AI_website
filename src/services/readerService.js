import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/get-csrf-token`, {
      withCredentials: true,
    });
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw new Error("Failed to fetch CSRF token");
  }
};

const getSpokenContent = async (textContent) => {
  try {
    const csrfToken = await fetchCsrfToken(); // Fetch CSRF token

    const response = await axios.post(
      `${API_URL}/api/read-text`,
      { text: textContent, voiceType: "alloy" },
      {
        headers: {
          "X-CSRF-Token": csrfToken,
          "Content-Type": "application/json",
        },
      }
    );
    // Decode base64 audio and create a Blob
    const audioData = response.data.audio;
    const audioBlob = new Blob(
      [
        new Uint8Array(
          atob(audioData)
            .split("")
            .map((char) => char.charCodeAt(0))
        ),
      ],
      { type: "audio/mpeg" }
    );
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error("Error reading text aloud:", error);
  }
};
export default {
  getSpokenContent,
};
