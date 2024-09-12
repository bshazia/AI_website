import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, CircularProgress, styled } from "@mui/material";
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
  const { verifyEmail } = AuthContext();

  useEffect(() => {
    console.log("Token received:", token); // Debug: Log the token
    if (token) {
      // Debug: Log before calling verifyEmail
      console.log("Calling verifyEmail with token:", token);
      verifyEmail(token)
        .then(() => {
          console.log("Email verification successful");
        })
        .catch((error) => {
          console.error("Error verifying email:", error);
        });
    } else {
      console.warn("No token found in searchParams");
    }
  }, [token, verifyEmail]);

  return (
    <Container>
      <CircularProgress color="inherit" />
      <Message>Verifying your email...</Message>
    </Container>
  );
};

export default VerifyEmailPage;
