import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import DOMPurify from "dompurify";
import { escapeHtml } from "../utils/securityUtils";
import styled from "styled-components";


const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #1b9cfc;
  border-radius: 5px;
  color: #55e6c1;
  background: none;
  font-size: large;
  font-weight: bold;
`;

const Button = styled.button`
  width: 50%;
  padding: 10px;
  border: 2px solid #55e6c1;
  border-radius: 40px;
  background: transparent;
  color: #c1c2c3;
  font-weight: bolder;
  cursor: pointer;
  margin: 20px 0;

  &:hover {
    background: #55e6c1;
    color: #182c61;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setSuccessMessage("");

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
      setEmailError(
        error.response?.data?.error || "An unexpected error occurred."
      );
    }
  };

  const sanitizeInput = (input) => DOMPurify.sanitize(escapeHtml(input));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        <Button type="submit">Register</Button>
        {successMessage && <div className="success">{successMessage}</div>}
      </form>
      </div>
  );
};

export default RegisterForm;
