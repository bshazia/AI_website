import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import ChatComponent from "./components/ChatComponent";
import Imageservice from "./pages/ImageService";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import CheckEmail from "./pages/CheckEmail";
import VerifyEmailPage from "./pages/Emailverifypage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* Protect these routes using ProtectedRoute */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={Dashboard} />}
          />
          <Route
            path="/chatgpt"
            element={<ProtectedRoute element={ChatComponent} />}
          />
          <Route
            path="/imageservice"
            element={<ProtectedRoute element={Imageservice} />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Add routes for CheckEmail and VerifyEmailPage */}
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
