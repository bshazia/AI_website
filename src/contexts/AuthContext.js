// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const getCsrfToken = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/get-csrf-token`,
      {
        withCredentials: true,
      }
    );
    return response.data.csrfToken;
  };

  const login = async (userData) => {
    try {
      const csrfToken = await getCsrfToken();
      const response = await authService.login(userData, csrfToken);
      localStorage.setItem("token", response.token); 
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
     const response = await authService.register(userData, csrfToken);
       localStorage.setItem("token", response.token);
       setUser(response.user);
       setIsAuthenticated(true);
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
    setLoading(false); // Set loading to false after checking
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
