// src/components/RegisterForm.js
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import DOMPurify from "dompurify";
import { escapeHtml } from "../utils/securityUtils";
import "../styles/form.css";

const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setSuccessMessage(""); // Clear success message

    // Validate inputs
    if (name.trim() === "") {
      setNameError("Name is required.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email address.");
      return;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required.");
      return;
    }

    try {
      await register({
        name: sanitizeInput(name),
        email: sanitizeInput(email),
        password: sanitizeInput(password),
      });
      setSuccessMessage(
        "Registration successful. Please check your email to verify your account."
      );
    } catch (error) {
      console.error("Registration failed", error);
        if (error.response && error.response.data && error.response.data.error) {
          // Set the error message from backend response
          setEmailError(error.response.data.error);
        } else {
          setEmailError("An unexpected error occurred.");
      }
    }
  };

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(escapeHtml(input));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      {nameError && <div className="error">{nameError}</div>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {emailError && <div className="error">{emailError}</div>}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {passwordError && <div className="error">{passwordError}</div>}
      <button className="btn-submit" type="submit">
        Register
      </button>
      {successMessage && <div className="success">{successMessage}</div>}
    </form>
  );
};

export default RegisterForm;
