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
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import RefreshIcon from "@mui/icons-material/Refresh";
import useChat from "../hooks/useChat";
import DOMPurify from "dompurify";
import { escapeHtml } from "../utils/securityUtils";
import imgsend from "../images/sent.png";
import { useNavigate } from "react-router-dom";
import he from "he"; // HTML entities decoding library
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  display: "flex",
  flexDirection: "column",
});

const ChatMessage = styled(Box)(({ isUser }) => ({
  alignSelf: isUser ? "flex-end" : "flex-start",
  backgroundColor: isUser ? "#007bff" : "#333",
  color: isUser ? "#fff" : "#ddd",
  padding: "10px",
  borderRadius: "10px",
  margin: "5px 0",
  maxWidth: "70%",
  wordBreak: "break-word",
  display: "flex",
  flexDirection: "column",
}));

const CodeBlock = styled(Box)({
  backgroundColor: "#333",
  borderRadius: "5px",
  padding: "10px",
  whiteSpace: "pre-wrap",
  fontFamily: "monospace",
});

const MessageActions = styled(Box)({
  marginTop: "10px",
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  color: "#fff",
});

const ActionButton = styled(IconButton)({
  color: "#fff",
  "&:hover": {
    color: "#007bff",
  },
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

  // Store the original message for each AI response
  const [originalMessages, setOriginalMessages] = useState({});

  const sendMessage = async () => {
    const sanitizedMessage = sanitizeMessage(userMessage);

    if (sanitizedMessage.trim() !== "") {
      const newMessages = [
        ...messages,
        { sender: "You", message: sanitizedMessage },
      ];
      setMessages(newMessages);

      // Clear the input field immediately
      setUserMessage("");

      // Store the original message for regeneration
      const messageId = newMessages.length - 1;
      setOriginalMessages((prev) => ({
        ...prev,
        [messageId]: sanitizedMessage,
      }));

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
    }
  };

  const regenerateResponse = async (messageId) => {
    const originalMessage = originalMessages[messageId];

    if (originalMessage) {
      try {
        // Request a new response from the AI for the original message
        await handleSendMessage(originalMessage);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "AI 4.O",
            message:
              "An error occurred while regenerating. Please try again later.",
          },
        ]);
      }
    }
  };

  const sanitizeMessage = (message) => {
    return DOMPurify.sanitize(message);
  };

const decodeHtmlEntities = (html) => {
  // Ensure that the input is a string
  if (typeof html !== "string") {
    console.error("decodeHtmlEntities expected a string but got:", html);
    return html; // Return the original value if it's not a string
  }
  return he.decode(html);
};


useEffect(() => {
  if (response) {
    const decodedResponse = decodeHtmlEntities(
      response.message ? response.message : response
    );
    const sanitizedResponse = sanitizeMessage(decodedResponse);
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

  const handleTextToSpeech = (text) => {
    // Check if the speechSynthesis API is supported
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    } else {
      console.error("Text-to-speech is not supported in this browser.");
    }
  };

  const handleFeedback = (type, message) => {
    // Handle feedback (e.g., log it or send it to a server)
    console.log(`${type} feedback for message:`, message);
  };

  const isCodeBlock = (message) => {
    return message.startsWith("```") && message.endsWith("```");
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
            <ChatMessage key={index} isUser={msg.sender === "You"}>
              {isCodeBlock(msg.message) ? (
                <CodeBlock
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(escapeHtml(msg.message)),
                  }}
                />
              ) : (
                <Box
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(escapeHtml(msg.message)),
                  }}
                />
              )}
              {msg.sender === "AI 4.O" && (
                <MessageActions>
                  <ActionButton onClick={() => handleTextToSpeech(msg.message)}>
                    <VolumeUpIcon />
                  </ActionButton>
                  <CopyToClipboard text={msg.message}>
                    <ActionButton>
                      <ContentCopyIcon />
                    </ActionButton>
                  </CopyToClipboard>
                  <ActionButton
                    onClick={() => handleFeedback("good", msg.message)}
                  >
                    <ThumbUpIcon />
                  </ActionButton>
                  <ActionButton
                    onClick={() => handleFeedback("bad", msg.message)}
                  >
                    <ThumbDownIcon />
                  </ActionButton>
                  <ActionButton onClick={() => regenerateResponse(index)}>
                    <RefreshIcon />
                  </ActionButton>
                </MessageActions>
              )}
            </ChatMessage>
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
