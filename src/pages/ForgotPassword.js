import React, { useState, useEffect } from "react";
import authService from "../services/authService";
import "../styles/form.css";

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
      const data = await authService.forgotPassword(email, csrfToken);
      setMessage(data.message);
    } catch (error) {
      console.error("Password reset request failed", error);
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleForgotPassword}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button type="submit">Send Reset Link</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ForgotPassword;
