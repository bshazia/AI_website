import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@mui/material';


import { AuthProvider } from "./contexts/AuthContext";

import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import ChatComponent from "./components/ChatComponent";
import Imageservice from "./pages/ImageService";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import CheckEmail from "./pages/CheckEmail";
import VerifyEmailPage from "./pages/Emailverifypage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ErrorPage from "./components/ErrorPage";
import VideoSummarizationPage from "./pages/VideoSummarizationPage";
import Chatbot from "./components/ChatbotComponent"; // Import the Chatbot component
import TextToImagePage from "./pages/TextToImagePage";
import TextProcessingPage from "./pages/TextProcessingPage";


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
          <Route
            path="/summarize"
            element={<ProtectedRoute element={VideoSummarizationPage} />}
          />
          <Route
            path="/generate-image"
            element={<ProtectedRoute element={TextToImagePage} />}
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/text-summary" element={<TextProcessingPage />} />

          {/* <Route path="/imageservice" element={<Imageservice />} />
            <Route path="/generate-image" element={<TextToImagePage />} />
            <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
        {/* <Chatbot /> */}
      </AuthProvider>
    </Router>
  );
};

export default App;
