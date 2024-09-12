import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCsrfToken = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/get-csrf-token`,
      { withCredentials: true }
    );
    return response.data.csrfToken;
  };

  // Improved error handling utility
  const handleAxiosError = (error) => {
    if (error.response) {
      // Server responded with a status other than 2xx
      if (error.response.status === 400) {
        return error.response.data.error || "Bad Request";
      } else if (error.response.status === 401) {
        return "Unauthorized. Please log in.";
      } else if (error.response.status === 409) {
        return "Email already in use.";
      } else if (error.response.status >= 500) {
        return "Server error. Please try again later.";
      }
    } else if (error.request) {
      // No response was received
      return "Network error. Please check your internet connection.";
    } else {
      // Something happened in setting up the request
      return "Error: " + error.message;
    }
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
      const errorMessage = handleAxiosError(error);
      console.error("Login failed:", errorMessage);
      return errorMessage; // Return error to be displayed in the UI
    }
  };

  const register = async (userData) => {
    try {
      const csrfToken = await getCsrfToken();
      await authService.register(userData, csrfToken);
      navigate("/check-email"); // Navigate to a page informing user to check email
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      console.error("Registration failed:", errorMessage);
      throw new Error(errorMessage); // Propagate error to UI
    }
  };

  const verifyEmail = async (token) => {
    console.log("Verifying email with token:", token);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/verify-email?token=${token}`
      );
      if (response.status === 200) {
        navigate("/dashboard");
      } else {
        console.warn("Unexpected response status:", response.status);
        navigate("/error");
      }
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      console.error("Email verification failed:", errorMessage);
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
