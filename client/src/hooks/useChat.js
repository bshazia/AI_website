// src/hooks/useChat.js
import { useState } from "react";
import {
  fetchCsrfToken,
  sendMessageToChatGPT,
} from "../services/chatGPTService";

const useChat = () => {
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSendMessage = async (message) => {
    setError(""); // Reset error state
    try {
      const csrfToken = await fetchCsrfToken();
      const chatGptResponse = await sendMessageToChatGPT(message, csrfToken); // Pass the message here
      setResponse(chatGptResponse);
    } catch (error) {
      setError("Error sending message to ChatGPT");
      console.error("Error:", error);
    }
  };

  return {
    response,
    error,
    handleSendMessage, // No need for setMessage
  };
};

export default useChat;
