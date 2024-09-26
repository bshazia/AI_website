import React from "react";
import MathTeacherForm from "../components/MathTeacherForm"; // Import UI component
import backgroundVideo from "../background.mp4";
import style from "styled-components";
const BackgroundVideo = style.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;
const MathTeacherAssistantPage = () => {
  return (
    <div>
      <BackgroundVideo autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </BackgroundVideo>
      <MathTeacherForm />
    </div>
  );
};

export default MathTeacherAssistantPage;
