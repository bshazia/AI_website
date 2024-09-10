import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import DOMPurify from "dompurify";
import { escapeHtml } from "../utils/securityUtils"; 
import "../styles/form.css";


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
    <div>
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
        <button className="btn-submit" type="submit">
          Login
        </button>
      </form>
      <Link to="/forgot-password">Forgot your password?</Link>{" "}
      {/* Link to forgot password page */}
    </div>
  );
};

export default LoginForm;
