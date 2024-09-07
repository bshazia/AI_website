import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import DOMPurify from "dompurify";
import { escapeHtml } from "../utils/securityUtils"; // Ensure you have this utility

const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");

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
      register({
        name: sanitizeInput(name),
        email: sanitizeInput(email),
        password: sanitizeInput(password),
      });
    } catch (error) {
      console.error("Registration failed", error);
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
