// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import axios from "axios";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const getCsrfToken = async () => {
    const response = await axios.get(`${API_URL}/api/get-csrf-token`, {
      withCredentials: true,
    });
    return response.data.csrfToken;
  };

  const login = async (userData) => {
    try {
      const csrfToken = await getCsrfToken();
      const response = await authService.login(userData, csrfToken);
      localStorage.setItem("token", response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      setIsAuthenticated(false);
    }
  };

  const register = async (userData) => {
    try {
      const csrfToken = await getCsrfToken();
      await authService.register(userData, csrfToken);
      navigate("/check-email");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const verifyEmail = async (token) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/verify-email?token=${token}`
      );
      if (response.status === 200) {
        navigate("/dashboard");
      } else {
        navigate("/error");
      }
    } catch (error) {
      console.error("Email verification failed", error);
      navigate("/error");
    }
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return { user, isAuthenticated, login, register, logout, verifyEmail };
};

export default useAuth;
