// src/components/BackgroundVideo.js
import React from "react";
import styled from "styled-components";
import TryMagic from "./"

const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1; // Keep it behind other content
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover; // Cover the entire container
`;

const BackgroundVideo = () => {
  return (
    <VideoContainer>
      <Video autoPlay loop muted>
        <source src={TryMagic} type="video/mp4" />
        Your browser does not support the video tag.
      </Video>
    </VideoContainer>
  );
};

export default BackgroundVideo;
