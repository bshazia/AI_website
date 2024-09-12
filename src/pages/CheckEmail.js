// src/pages/CheckEmail.js
import React from "react";
import { Container, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const CheckEmail = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Check Your Email
        </Typography>
        <Typography variant="body1" gutterBottom>
          We have sent a verification email to your address. Please check your
          inbox (and spam folder) for the verification link.
        </Typography>
        <div style={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")} // Redirect to the landing page
            style={{ marginRight: "10px" }}
          >
            Go back to main
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => window.location.reload()}
          >
            Stay Here
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default CheckEmail;
