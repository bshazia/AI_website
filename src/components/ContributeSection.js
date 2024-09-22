// src/components/ContributeSection.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ContributeContainer = styled.section`
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 40px;
  backdrop-filter: blur(10px);

  h2 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  p {
    margin-top: 10px;
    font-size: 1.2rem;
  }

  .cta-button {
    color: #d1320f;
    font-weight: bold;
    background: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background: #d1320f;
      color: #fff;
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.6rem;
    }
  }
`;

const ContributeSection = () => {
  return (
    <ContributeContainer>
      <h2>🚀 Please Contribute to Our Project!</h2>
      <p>
        We would greatly appreciate your support for our project! By registering
        as a Premium User, your generous donation will help us to continue our
        mission. Thank you!
      </p>
      <p>Start creating now – for free!</p>
      <Link to="/register" className="cta-button">
        <b>Register Now</b>
      </Link>
    </ContributeContainer>
  );
};

export default ContributeSection;
