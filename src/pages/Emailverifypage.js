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
  const status = searchParams.get("status");
  const { verifyEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "success") {
      setMessage("Email verification successful! welcome to the jungle!.");
    } else if (status === "error") {
      setMessage("Error verifying email. Please try again or contact support.");
    }
  }, [status]);

  const handleBackToHome = () => {
    navigate("/");
  };
  return (
    <Container>
      <Message>{message}</Message>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/dashboard")}
        style={{ marginTop: "20px" }}
      >
        Go to Dashboard
      </Button>
    </Container>
  );
};

export default VerifyEmailPage;
