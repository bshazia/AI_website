// src/components/ContributeSection.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/ContributeSection.css"; // Create this file to style the contribute section

const ContributeSection = () => {
  return (
    <section className="contribute">
      <h2>🚀 Please Contribute to Our Project!</h2>
      <p>
        We would greatly appreciate your support for our project! By registering
        as a Premium User, your generous donation will help us to continue our
        mission. Thank you!
      </p>
      <p>Start creating now – for free!</p>
      <Link to="/register" className="cta-button-r">
        <b>Register Now</b>
      </Link>
    </section>
  );
};

export default ContributeSection;
