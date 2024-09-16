import React from "react";
import { Box, Typography, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate("/"); // Redirect to the home page or another route
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Please go back and try to login.
      </Typography>
      <Typography variant="h6"> Oops! Something went wrong. </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleHomeRedirect}
        style={{ marginTop: "20px" }}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
