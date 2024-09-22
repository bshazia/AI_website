import React from "react";
import "../styles/WhyUseSection.css"; // Ensure this path is correct

const WhyUseSection = () => {
  return (
    <section className="why-use">
      <h2>🌟 Why Use Our Free AI Tools?</h2>
      <div className="features-grid">
        <div className="feature-item">
          <h3>No Cost, No Catch</h3>
          <p>Full access to all features without paying a dime.</p>
        </div>
        <div className="feature-item">
          <h3>Easy to Use</h3>
          <p>
            No technical skills required – simply sign up and start creating.
          </p>
        </div>
        <div className="feature-item">
          <h3>Accessible to Everyone</h3>
          <p>
            Tailored for startups, freelancers, entrepreneurs, and content
            creators.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUseSection;
