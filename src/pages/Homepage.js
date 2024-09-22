// src/pages/HomePage.js
import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import WhyUseSection from "../components/WhyUseSection";
import ContributeSection from "../components/ContributeSection";
import EntryPage from "../components/EntryPage";
import styled from "styled-components";
import "../styles/HomePage.css"; // Ensure this path is correct
import ToolsSection from "../components/ToolsSection";

const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const HomePageContainer = styled.div`
  font-family: "Roboto", sans-serif; // Use a modern font
  color: #fff;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

const HomePage = () => {
  const [showAuth, setShowAuth] = React.useState(false);
  const [authView, setAuthView] = React.useState("login");

  const handleAuthToggle = (view) => {
    setAuthView(view);
    setShowAuth(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("auth-popup-overlay")) {
      setShowAuth(false);
    }
  };

  return (
    <HomePageContainer>
      <BackgroundVideo autoPlay loop muted>
        <source src="path/to/your/background-video.mp4" type="video/mp4" />
      </BackgroundVideo>
      <Header
        onLoginClick={() => handleAuthToggle("login")}
        onSignupClick={() => handleAuthToggle("signUp")}
      />
      {showAuth && (
        <div className="auth-popup-overlay" onClick={handleOverlayClick}>
          <EntryPage
            className="auth-popup"
            initialView={authView}
            onClose={() => setShowAuth(false)}
          />
        </div>
      )}
      <HeroSection />
      <ToolsSection />
      <WhyUseSection />
      <ContributeSection />
    </HomePageContainer>
  );
};

export default HomePage;
