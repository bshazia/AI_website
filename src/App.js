import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios"; 
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
import TextToImagePage from "./pages/TextToImagePage";
import TextProcessingPage from "./pages/TextProcessingPage";
import ImageGenerator from "./pages/ImageGenerator";
import SentimentAnalysisPage from "./pages/SentimentAnalysisPage";
import TextSummarizationPage from "./pages/TextSummarizationPage";
import ContentGenerationPage from "./pages/ContentGenerationPage";
import KeywordExtractionPage from "./pages/KeywordExtractionPage";
import MathTeacherAssistantPage from "./pages/MathTeacherAssistantPage";
import TextToSpeechPage from "./pages/TextToSpeechPage";
import AudiobookGenerator from "./components/AudiobookGenerator";
import AccessibilityReader from "./components/AccessibilityReader";
import Layout from "./components/Layout";

// Axios global configuration
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
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
            <Route
              path="/text-summary"
              element={<ProtectedRoute element={TextProcessingPage} />}
            />
            <Route
              path="/ai-image-generator"
              element={<ProtectedRoute element={ImageGenerator} />}
            />
            <Route
              path="/ai-sentiment"
              element={<ProtectedRoute element={SentimentAnalysisPage} />}
            />
            <Route
              path="/ai-textSummary"
              element={<ProtectedRoute element={TextSummarizationPage} />}
            />
            <Route
              path="/ai-generate-content"
              element={<ProtectedRoute element={ContentGenerationPage} />}
            />
            <Route
              path="/keyword-extraction"
              element={<ProtectedRoute element={KeywordExtractionPage} />}
            />
            <Route
              path="/ask-math-teacher"
              element={<ProtectedRoute element={MathTeacherAssistantPage} />}
            />
            <Route
              path="/text-to-speech"
              element={<ProtectedRoute element={TextToSpeechPage} />}
            />
            <Route
              path="/generate-audiobook"
              element={<ProtectedRoute element={AudiobookGenerator} />}
            />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/check-email" element={<CheckEmail />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/read-text" element={<AccessibilityReader />} />
            {/* <Route path="/generate-image" element={<TextToImagePage />} />
            <Route path="/dashboard" element={<Dashboard />} /> */}
          </Routes>
          {/* <Chatbot /> */}
        </Layout>
      </AuthProvider>
    </Router>
  );
};
export default App;
