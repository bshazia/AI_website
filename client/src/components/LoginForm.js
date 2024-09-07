import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import DOMPurify from "dompurify";
import { escapeHtml } from "../utils/securityUtils"; // Ensure you have this utility

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    // Validate inputs
    if (!validateEmail(email)) {
      setEmailError("Invalid email address.");
      return;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required.");
      return;
    }

    try {
      await login({
        email: sanitizeInput(email),
        password: sanitizeInput(password),
      });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(escapeHtml(input));
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
