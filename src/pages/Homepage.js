import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import WhyUseSection from "../components/WhyUseSection";
import ContributeSection from "../components/ContributeSection";
import EntryPage from "../components/EntryPage";
import "../styles/HomePage.css"; // Ensure this path is correct

const HomePage = () => {
  const [showAuth, setShowAuth] = React.useState(false);
  const [authView, setAuthView] = React.useState("login"); // Default to signUp

  const handleAuthToggle = (view) => {
    setAuthView(view); // Set the desired view (logIn or signUp)
    setShowAuth(true); // Show the popup
  };

  const handleOverlayClick = (e) => {
    // Close the popup if the overlay is clicked
    if (e.target.classList.contains("auth-popup-overlay")) {
      setShowAuth(false);
    }
  };

  return (
    <div className="homepage-container">
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
      <FeaturesSection />
      <WhyUseSection />
      <ContributeSection />
    </div>
  );
};

export default HomePage;
