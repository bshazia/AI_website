// src/services/chatGPTService.js
import axios from "axios";

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
export const sendMessageToChatGPT = async (message, csrfToken) => {
  try {
    const response = await axios.post(`${API_URL}/api/chat`,
      { message },
      {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending message to ChatGPT:", error);
    throw error;
  }
};
