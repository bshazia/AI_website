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
      navigate("/check-email"); // Navigate to a page informing user to check email
    } catch (error) {
      console.error("Registration failed", error);
      throw error; // Ensure errors are propagated
    }
  };

  const verifyEmail = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/verify-email?token=${token}`
      );
      if (response.status === 200) {
        navigate("/dashboard"); // Redirect to dashboard on success
      } else {
        navigate("/error"); // Redirect to an error page
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
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        verifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
