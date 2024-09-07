// src/components/Header.js
import React from "react";
import "../styles/Header.css";

const Header = ({ onLoginClick, onSignupClick }) => {
  return (
    <header className="header">
      <h1>AI Tools for Everyone – 100% Free!</h1>
      <nav>
        <button className="button login-button" onClick={onLoginClick}>
          Login
        </button>
        <button className="button signup-button" onClick={onSignupClick}>
          Sign Up
        </button>
      </nav>
    </header>
  );
};

export default Header;
