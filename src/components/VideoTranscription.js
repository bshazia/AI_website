import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import useTranscription from "../hooks/useTranscription";
import { motion } from "framer-motion";
import styled from "styled-components";

// Styled components for dynamic styling
const AIButton = styled(Button)`
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
`;

const AITitle = styled(Typography)`
  font-size: 2.5rem;
  font-weight: 600;
  color: #00c9ff;
  text-align: center;
  margin-bottom: 2rem;
`;

const VideoTranscription = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const {
    transcription,
    loading,
    error,
    handleTranscription,
  } = useTranscription();

  const handleSubmit = () => {
    handleTranscription(videoUrl);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          padding: "2rem",
          backgroundColor: "#1a1a2e",
          borderRadius: "12px",
        }}
      >
        <AITitle>AI-Powered Video Transcription</AITitle>

        <Box mb={3}>
          <TextField
            label="YouTube Video URL"
            variant="outlined"
            fullWidth
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </Box>

        <AIButton
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          disabled={loading}
        >
          {loading ? "Transcribing..." : "Get Transcription"}
        </AIButton>

        {/* Error handling */}
        {error && <Typography color="error">{error}</Typography>}

        {/* Display transcription result */}
        {transcription && (
          <Box mt={5}>
            <Typography variant="h6">Transcription:</Typography>
            <Typography variant="body1">{transcription}</Typography>
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

export default VideoTranscription;
