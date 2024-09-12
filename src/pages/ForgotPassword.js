import React, { useState, useEffect } from "react";
import authService from "../services/authService";
import { Box, TextField, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

const BackButton = styled(Button)({
  marginTop: "10px",
  color: "#fff",
  backgroundColor: "#6c757d",
  "&:hover": {
    backgroundColor: "#5a6268",
  },
});

const Message = styled(Typography)({
  marginTop: "10px",
  color: "#ff4d4d", // Red color for error messages
});

const SuccessMessage = styled(Typography)({
  marginTop: "10px",
  color: "#4CAF50", // Green color for success messages
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const navigate = useNavigate(); // To navigate between routes

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("/api/get-csrf-token");
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token", error);
        setMessage(
          "Failed to retrieve security token. Please refresh the page."
        );
      }
    };

    fetchCsrfToken();
  }, []);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    try {
      const sanitizedEmail = sanitizeInput(email);
      const data = await authService.forgotPassword(sanitizedEmail, csrfToken);
      if (data.success) {
        setMessage("Password reset link sent. Please check your email.");
      } else if (data.error === "Email not found") {
        setMessage("No account is associated with this email.");
      } else {
        setMessage(data.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Password reset request failed", error);
      setMessage(
        error.response?.status === 500
          ? "Server error. Please try again later."
          : "An unexpected error occurred. Please try again."
      );
    }
  };

  const sanitizeInput = (input) => {
    // Simple sanitization; customize if needed
    return input.trim();
  };

  const handleBackToLanding = () => {
    navigate("/"); // Navigate back to the landing page
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
        {message && (
          <Message>
            {message.includes("error") ? (
              message
            ) : (
              <SuccessMessage>{message}</SuccessMessage>
            )}
          </Message>
        )}
      </Form>
      <BackButton variant="contained" onClick={handleBackToLanding}>
        Back to Landing Page
      </BackButton>
    </FormContainer>
  );
};

export default ForgotPassword;
