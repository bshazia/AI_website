// src/components/HeroSection.js
import React from "react";
import "../styles/HeroSection.css"; // Create this file to style the hero section

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>🚀 Unleash the Power of AI – Absolutely Free!</h2>
        <p>
          No subscriptions. No hidden fees. Just pure innovation at your
          fingertips.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
