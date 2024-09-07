// src/components/FeaturesSection.js
import React from "react";
import "../styles/FeaturesSection.css"; // Create this file to style the features section

const FeaturesSection = () => {
  return (
    <section className="features">
      <h2>💡 Our AI Tools</h2>
      <h4>
        Experience the future of communication with our AI Tools, powered by the
        cutting-edge Chat GPT-4.0 version!
      </h4>
      <div className="features-grid">
        <div className="feature-card">
          <h3>Free Text-to-Image AI Generator</h3>
          <p>
            Create stunning AI-generated images and visuals from your ideas.
          </p>
        </div>
        <div className="feature-card">
          <h3>Free Text-to-Video AI Creator</h3>
          <p>Turn words into dynamic, high-quality AI videos in seconds.</p>
        </div>
        <div className="feature-card">
          <h3>Free AI-Powered Text Editor</h3>
          <p>
            Supercharge your writing with AI-driven suggestions, grammar
            correction, and smart content generation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
