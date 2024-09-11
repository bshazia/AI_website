// src/components/ForgotPassword.js
import React, { useState, useEffect } from "react";
import authService from "../services/authService";
import { Box, TextField, Button, Typography, styled } from "@mui/material";

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#1c1c1c",
  color: "#fff",
  padding: "20px",
});

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: "300px",
  backgroundColor: "#121212",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
});

const SubmitButton = styled(Button)({
  marginTop: "10px",
  color: "#fff",
  backgroundColor: "#007bff",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
});

const Message = styled(Typography)({
  marginTop: "10px",
  color: "#ff4d4d", // Red color for error messages
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("/api/get-csrf-token");
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token", error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const sanitizedEmail = sanitizeInput(email);
      const data = await authService.forgotPassword(sanitizedEmail, csrfToken);
      setMessage(data.message);
    } catch (error) {
      console.error("Password reset request failed", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  const sanitizeInput = (input) => {
    // Simple sanitization; customize if needed
    return input.trim();
  };

  return (
    <FormContainer>
      <Form onSubmit={handleForgotPassword}>
        <TextField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{ style: { color: "#fff" } }} // Change text color
          InputLabelProps={{ style: { color: "#fff" } }} // Change label color
        />
        <SubmitButton type="submit" variant="contained">
          Send Reset Link
        </SubmitButton>
        {message && <Message>{message}</Message>}
      </Form>
    </FormContainer>
  );
};

export default ForgotPassword;
