// src/services/authService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Register user
const register = async (userData, csrfToken) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/register`,
    userData,
    {
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Login user
const login = async (userData, csrfToken) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/login`,
    userData,
    {
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("token"); // Remove JWT token from local storage
};

// Forgot password
const forgotPassword = async (email, csrfToken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/forgot-password`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        withCredentials: true, // Ensure cookies are sent with the request
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while processing your request."
    );
  }
};
// Reset password
const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/reset-password`,
      { token, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensure cookies are sent with the request
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while resetting your password."
    );
  }
};


const authService = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
};

export default authService;
