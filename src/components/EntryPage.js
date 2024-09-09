// src/components/EntryPage.js
import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../styles/EntryPage.css"; // Ensure this path is correct

const EntryPage = ({ className, onClose, initialView = "login" }) => {
  const [currentView, setCurrentView] = useState(initialView); // default to login view
  // Update current view whenever initialView prop changes
  useEffect(() => {
    setCurrentView(initialView);
  }, [initialView]);

  const handleToggle = (view) => {
    setCurrentView(view);
  };

  return (
    <div className={className}>
      <div className="entry-popup">
        <div className="tabs-form">
          <button
            className={currentView === "login" ? "active" : ""}
            onClick={() => handleToggle("login")}
          >
            Log In
          </button>
          <button
            className={currentView === "register" ? "active" : ""}
            onClick={() => handleToggle("register")}
          >
            Register
          </button>
        </div>
        <div className="form-container">
          {currentView === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EntryPage;
