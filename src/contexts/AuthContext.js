// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const csrfToken = await getCsrfToken();
      await authService.register(userData, csrfToken);
      navigate("/check-email");
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const verifyEmail = async (token) => {
    console.log("Verifying email with token:", token);
    try {
      const csrfToken = Cookies.get("csrfToken"); // Adjust based on how your CSRF token is stored
      const response = await axios.get(
        `${
          process.env.REACT_APP_API_URL
        }/api/verify-email?token=${encodeURIComponent(token)}`,
        { headers: { "X-CSRF-Token": csrfToken } }
      );
      console.log("API Response:", response);
      if (response.status === 200) {
        console.log("Email verification successful");
        console.log("Redirecting to dashboard");
        navigate("/dashboard");
        console.log("woo hoo Redirected to dashboard");
      } else {
        console.warn("Unexpected response status:", response.status);
        navigate("/error");
      }
    } catch (error) {
      console.error("Email verification failed:", error);
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
    console.log("AuthProvider is rendered");
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // Optionally fetch the user data if needed
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