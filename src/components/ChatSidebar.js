import React from "react";
import "../styles/Chatgpt.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function ChatSidebar({ sidebarOpen, setSidebarOpen, messages }) {
  const navigate = useNavigate(); // Initialize navigate

  const handleBack = () => {
    navigate("/dashboard"); // Navigate back to dashboard
  };

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close History" : "Open History"}
      </button>

      {/* Back Button to navigate to the dashboard */}
      <button className="back-button" onClick={handleBack}>
        Back to Dashboard
      </button>

      <div className="chat-history">
        <h3>Chat History</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.sender}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatSidebar;
