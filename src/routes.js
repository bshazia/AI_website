import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import ChatComponent from "./components/ChatComponent";
import Imageservice from "./pages/ImageService";

const routes = [
  { path: "/", element: <Homepage /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/chat", element: <ChatComponent /> },
  { path: "/imageservices", element: <Imageservice /> },
];
export default routes;