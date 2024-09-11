// src/components/ChatSidebar.js
import React from "react";
import { Box, Typography, Button, styled } from "@mui/material";

const SidebarContainer = styled(Box)({
  width: "250px",
  height: "100vh",
  backgroundColor: "#333",
  color: "#fff",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const CloseButton = styled(Button)({
  color: "#fff",
  backgroundColor: "#007bff",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
});

function ChatSidebar({ setSidebarOpen }) {
  return (
    <SidebarContainer>
      <Box>
        <Typography variant="h6">Chat Summary</Typography>
        <Typography variant="body2" style={{ marginTop: "10px" }}>
          Your summarized response will go here. It can be based on recent chat
          activity.
        </Typography>
      </Box>
      <CloseButton onClick={() => setSidebarOpen(false)}>
        Close Sidebar
      </CloseButton>
    </SidebarContainer>
  );
}

export default ChatSidebar;
