import React, { useState, useEffect, useRef } from "react";
import "../styles/Chatgpt.css";
import imgsend from "../images/sent.png";
import useChat from "../hooks/useChat";
import DOMPurify from "dompurify";
import { escapeHtml } from "../utils/securityUtils";
import ChatSidebar from "./ChatSidebar"; // Import ChatSidebar

function ChatComponent() {
  const { response, handleSendMessage } = useChat();
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state
  const chatMessagesRef = useRef(null);

  const sendMessage = async () => {
    const sanitizedMessage = sanitizeMessage(userMessage);

    if (sanitizedMessage.trim() !== "") {
      const newMessages = [
        ...messages,
        { sender: "You", message: sanitizedMessage },
      ];
      setMessages(newMessages);

      try {
        await handleSendMessage(sanitizedMessage); // Pass sanitizedMessage here
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "AI 4.O",
            message: "An error occurred. Please try again later.",
          },
        ]);
      }

      setUserMessage(""); // Clear the input field
    }
  };

  const sanitizeMessage = (message) => {
    // Escape HTML entities to prevent XSS
    return escapeHtml(DOMPurify.sanitize(message));
  };

  // Update chat messages when response changes
  useEffect(() => {
    if (response) {
      const sanitizedResponse = sanitizeMessage(response);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "AI 4.O", message: sanitizedResponse },
      ]);
    }
  }, [response]); // This will trigger when `response` is updated

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-app">
      {/* Render Sidebar */}
      <ChatSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        messages={messages}
      />

      <div className="chat-container">
        <div className="chat-messages" ref={chatMessagesRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className="chat-message"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  `<strong>${escapeHtml(msg.sender)}:</strong> ${escapeHtml(
                    msg.message
                  )}`
                ),
              }}
            />
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            value={userMessage}
            placeholder="Type your message..."
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="send-button" onClick={sendMessage}>
            <img src={imgsend} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
