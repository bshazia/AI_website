import React from "react";
import "../styles/Chatgpt.css";
import { useNavigate } from "react-router-dom";

function ChatSidebar({ sidebarOpen, setSidebarOpen, summarizedResponse }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard"); // Navigate back to dashboard
  };

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>

      {/* Back Button to navigate to the dashboard */}
      <button className="back-button" onClick={handleBack}>
        Back to Dashboard
      </button>

      <div className="chat-history">
        <h3>Chat History</h3>
        <ul>
          {summarizedResponse && (
            <li>
              <strong>AI 4.O:</strong> {summarizedResponse}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ChatSidebar;
