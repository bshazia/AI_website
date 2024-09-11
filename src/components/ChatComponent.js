// src/components/ChatComponent.js
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  styled,
  Drawer,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useChat from "../hooks/useChat";
import DOMPurify from "dompurify";
import { escapeHtml } from "../utils/securityUtils";
import imgsend from "../images/sent.png";
import { useNavigate } from "react-router-dom";

const ChatAppContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  backgroundColor: "#1c1c1c",
});

const SidebarDrawer = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    boxSizing: "border-box",
    backgroundColor: "#1c1c1c",
    color: "#fff",
  },
});

const ChatContainer = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  color: "#fff",
});

const ChatMessages = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "10px",
  border: "1px solid #333",
  borderRadius: "8px",
  backgroundColor: "#121212",
});

const ChatInputContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "10px",
});

const ChatInput = styled(TextField)({
  flex: 1,
  backgroundColor: "#333",
  borderRadius: "4px",
  "& .MuiInputBase-input": {
    color: "#fff",
  },
});

const SendButton = styled(Button)({
  marginLeft: "10px",
  color: "#fff",
  backgroundColor: "#007bff",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
  "& img": {
    width: "20px",
    height: "20px",
  },
});

const BackButton = styled(IconButton)({
  marginBottom: "10px",
  color: "#fff",
});

function ChatComponent() {
  const { response, handleSendMessage } = useChat();
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Toggle sidebar
  const chatMessagesRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  const sendMessage = async () => {
    const sanitizedMessage = sanitizeMessage(userMessage);

    if (sanitizedMessage.trim() !== "") {
      const newMessages = [
        ...messages,
        { sender: "You", message: sanitizedMessage },
      ];
      setMessages(newMessages);

      try {
        await handleSendMessage(sanitizedMessage);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "AI 4.O",
            message: "An error occurred. Please try again later.",
          },
        ]);
      }

      setUserMessage("");
    }
  };

  const sanitizeMessage = (message) => {
    return escapeHtml(DOMPurify.sanitize(message));
  };

  useEffect(() => {
    if (response) {
      const sanitizedResponse = sanitizeMessage(response);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "AI 4.O", message: sanitizedResponse },
      ]);
    }
  }, [response]);

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

  const handleBack = () => {
    navigate("/dashboard"); // Navigate to DashboardPage
  };

  return (
    <ChatAppContainer>
      {/* Sidebar Drawer */}
      <SidebarDrawer
        variant="persistent"
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        <Box p={2}>
          <h3>Sidebar Content</h3>
          <p>Useful chat information here</p>
        </Box>
      </SidebarDrawer>

      <ChatContainer>
        {/* Back Button */}
        <BackButton onClick={handleBack}>
          <ArrowBackIcon />
        </BackButton>

        {/* Toggle Sidebar Button */}
        <IconButton
          onClick={() => setSidebarOpen(!sidebarOpen)}
          sx={{ color: "#fff", alignSelf: "flex-start" }}
        >
          <MenuIcon />
        </IconButton>

        <ChatMessages ref={chatMessagesRef}>
          {messages.map((msg, index) => (
            <Box
              key={index}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  `<strong>${escapeHtml(msg.sender)}:</strong> ${escapeHtml(
                    msg.message
                  )}`
                ),
              }}
              marginBottom={1}
              padding={1}
              borderRadius={1}
              border="1px solid #333"
              bgcolor="#121212"
            />
          ))}
        </ChatMessages>

        <ChatInputContainer>
          <ChatInput
            type="text"
            value={userMessage}
            placeholder="Type your message..."
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SendButton onClick={sendMessage}>
            <img src={imgsend} alt="Send" />
          </SendButton>
        </ChatInputContainer>
      </ChatContainer>
    </ChatAppContainer>
  );
}

export default ChatComponent;
