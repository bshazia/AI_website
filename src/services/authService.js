import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
// console.log(API_URL);
// Register user
const register = async (userData, csrfToken) => {
  const response = await axios.post(`${API_URL}/api/register`, userData, {
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    withCredentials: true,
  });
  return response.data;
};

const login = async (userData, csrfToken) => {
  const response = await axios.post(`${API_URL}/api/login`, userData, {
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    withCredentials: true,
  });
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("token"); // Remove JWT token from local storage
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
