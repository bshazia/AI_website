// ChatbotComponent.js
import React, { useState } from "react";
import { Box, Button, IconButton, styled } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import CloseIcon from "@mui/icons-material/Close";
import SyncIcon from "@mui/icons-material/Sync";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Styled components
const ChatbotContainer = styled(Box)({
  position: "fixed",
  bottom: 0,
  right: 0,
  width: "400px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
});

const VideoWrapper = styled(Box)({
  position: "relative",
  width: "100%",
  height: "auto",
});

const ChatContent = styled(Box)({
  padding: "10px",
  flex: 1,
  overflowY: "auto",
});

const ActionButton = styled(IconButton)({
  color: "#000",
  "&:hover": {
    color: "#007bff",
  },
});

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleMute = () => setIsMuted(!isMuted);
  const closeChat = () => setIsOpen(false);

  return (
    <ChatbotContainer>
      {isOpen && (
        <>
          <VideoWrapper>
            <video
              id="talk-video"
              width="400"
              height="400"
              playsInline
              autoPlay
              loop
              muted={isMuted}
              src="/assets/country/videos/idle.v3.mp4"
            />
          </VideoWrapper>
          <ChatContent>
            <div>Hello, I’m Eva</div>
            <p>I am here to help you find what you are looking for.</p>
            <Button variant="contained" color="primary" disabled>
              <SyncIcon /> Ask me
            </Button>
            <Button variant="outlined" color="secondary">
              Maybe later
            </Button>
            <div>
              <Button onClick={toggleMute}>
                {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </Button>
              <Button onClick={closeChat}>
                <CloseIcon />
              </Button>
            </div>
          </ChatContent>
        </>
      )}
      {!isOpen && <Button onClick={toggleChat}>Open chat</Button>}
    </ChatbotContainer>
  );
};

export default ChatbotComponent;
