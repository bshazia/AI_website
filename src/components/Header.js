import React from "react";
import "../styles/Header.css";
import { Button } from "@mui/material";

const Header = ({ onLoginClick, onSignupClick }) => {
  return (
    <header className="header">
      <h1>AI Tools for Everyone – 100% Free!</h1>
      <nav>
        <Button
          variant="contained"
          color="primary" // Set color to 'primary' for both buttons
          onClick={onLoginClick}
          className="header-button"
        >
          Login
        </Button>
        <Button
          variant="contained" // Change to 'contained' to match the style
          color="primary" // Set color to 'primary' for both buttons
          onClick={onSignupClick}
          className="header-button"
        >
          Sign Up
        </Button>
      </nav>
    </header>
  );
};

export default Header;
