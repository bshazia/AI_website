import React from "react";
import { Container } from "@mui/material";
import VideoTranscription from "../components/VideoTranscription";
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
const VideoTranscriptionPage = () => {
  return (
    <Container maxWidth="md">
      <BackgroundVideo autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </BackgroundVideo>
      <VideoTranscription />
    </Container>
  );
};

export default VideoTranscriptionPage;
