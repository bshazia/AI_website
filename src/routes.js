import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import ChatComponent from "./components/ChatComponent";
import Imageservice from "./pages/ImageService";
import ForgotPassword from "./pages/ForgotPassword";
import CheckEmail from "./pages/CheckEmail";
import VerifyEmailPage from "./pages/Emailverifypage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VideoSummarizationPage from "./pages/VideoSummarizationPage";
import TextProcessingPage from "./pages/TextProcessingPage";
import VideoTranscriptionPage from "./pages/VideoTranscriptionPage";
import ImageGenerator from "./pages/ImageGenerator";
import SentimentAnalysisPage from "./pages/SentimentAnalysisPage";
import TextSummarizationPage from "./pages/TextSummarizationPage";
import KeywordExtractionPage from "./pages/KeywordExtractionPage";
import MathTeacherAssistantPage from "./pages/MathTeacherAssistantPage";
import TextToSpeechPage from "./pages/TextToSpeechPage";
import AudiobookGenerator from "./components/AudiobookGenerator";
import AccessibilityReader from "./components/AccessibilityReader";

const routes = [
  { path: "/", element: <Homepage /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/chat", element: <ChatComponent /> },
  { path: "/imageservices", element: <Imageservice /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/check-email", element: <CheckEmail /> },
  { path: "/verify-email", element: <VerifyEmailPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "/error", element: <ErrorPage /> },
  { path: "/video-summarization", element: <VideoSummarizationPage /> },
  { path: "/text-summary", element: <TextProcessingPage /> },
  { path: "/video-transcription", element: <VideoTranscriptionPage /> },
  { path: "/ai-image-generator", element: <ImageGenerator /> },
  { path: "/ai-sentiment", element: <SentimentAnalysisPage /> },
  { path: "/ai-textSummary", element: <TextSummarizationPage /> },
  { path: "/ai-generate-content", element: <ContentGenerationPage /> },
  { path: "/keyword-extraction", element: <KeywordExtractionPage /> },
  { path: "/ask-math-teacher", element: <MathTeacherAssistantPage /> },
  { path: "/text-to-speech", element: <TextToSpeechPage /> },
  { path: "/generate-audiobook", element: <AudiobookGenerator /> },
  { path: "/read-text", element: <AccessibilityReader /> },
];
export default routes;
