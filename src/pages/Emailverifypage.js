// src/components/VerifyEmailPage.js
import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  styled,
} from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#1c1c1c",
  color: "#fff",
  textAlign: "center",
});

const Message = styled(Typography)({
  marginTop: "20px",
  color: "#fff",
});

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { verifyEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("Token received:", token); // Debug: Log the token
    if (token) {
      console.log("Calling verifyEmail with token:", token);
      if (typeof verifyEmail === "function") {
        verifyEmail(token)
          .then(() => {
            setLoading(false);
            setMessage("Email verification successful! You can now log in.");
            setError(false);
          })
          .catch((error) => {
            setLoading(false);
            setMessage(
              "Error verifying email. Please try again or contact support."
            );
            setError(true);
            console.error("Error verifying email:", error);
          });
      } else {
        console.error("verifyEmail is not a function:", verifyEmail);
        setLoading(false);
        setMessage(
          "Error verifying email. Please try again or contact support."
        );
        setError(true);
      }
    } else {
      setLoading(false);
      setMessage(
        "No token found in the URL. Please check the link or try again."
      );
      setError(true);
      console.warn("No token found in searchParams");
    }
  }, [token, verifyEmail]);

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Container>
      {loading ? (
        <>
          <CircularProgress color="inherit" />
          <Message>Verifying your email...</Message>
        </>
      ) : (
        <>
          <Message>{message}</Message>
          {error ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBackToHome}
              style={{ marginTop: "20px" }}
            >
              Back to Main Page
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/dashboard")}
              style={{ marginTop: "20px" }}
            >
              Go to Dashboard
            </Button>
          )}
        </>
      )}
    </Container>
  );
};

export default VerifyEmailPage;
