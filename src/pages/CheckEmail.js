// src/pages/CheckEmail.js
import React from "react";
import { Container, Typography, Paper, styled } from "@mui/material";

// Styled components for dark theme
const DarkPaper = styled(Paper)({
  padding: "20px",
  textAlign: "center",
  backgroundColor: "#1c1c1c", // Dark background for the Paper
  color: "#fff",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
});

const DarkContainer = styled(Container)({
  backgroundColor: "#121212", // Dark background for the entire page
  minHeight: "100vh", // Ensure it covers the full viewport height
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // Ensure that max-width is not restricted by default
  maxWidth: "auto"
});

const CheckEmail = () => {
  return (
    <DarkContainer component="main" maxWidth="xs">
      <DarkPaper elevation={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Check Your Email
        </Typography>
        <Typography variant="body1">
          We have sent a verification email to your address. Please check your
          inbox (and spam folder) for the verification link.
        </Typography>
      </DarkPaper>
    </DarkContainer>
  );
};

export default CheckEmail;
