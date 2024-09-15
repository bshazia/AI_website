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
];
export default routes;
