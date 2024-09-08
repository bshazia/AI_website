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
    const response = await axios.get(`${API_URL}/get-csrf-token`, {
      withCredentials: true,
    });
    return response.data.csrfToken;
  };

  const login = async (userData) => {
    try {
      const csrfToken = await getCsrfToken();
      const response = await authService.login(userData, csrfToken);
      localStorage.setItem("token", response.token); // Save the token in localStorage
      setUser(response.user);
      setIsAuthenticated(true);
      navigate("/dashboard"); // Navigate to dashboard after login
    } catch (error) {
      console.error("Login failed", error);
      setIsAuthenticated(false);
    }
  };

  const register = async (userData) => {
    try {
      const csrfToken = await getCsrfToken();
      await authService.register(userData, csrfToken);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed", error);
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
    // Check if token is in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return { user, isAuthenticated, login, register, logout };
};

export default useAuth;
