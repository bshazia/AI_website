import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateSpeech } from "../services/texttoSpeechServices";
import {
  Container,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import styled from "styled-components";
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
const StyledContainer = styled(Container)`
  background: linear-gradient(to bottom right, #01adb9, hsla(252, 13%, 46%, 1));
  color: #ffffff;
  min-height: 100vh;
  padding: 4rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const TextToSpeechPage = () => {
        const [text, setText] = useState("");
        const [voice, setVoice] = useState("alloy");
        const [audioSrc, setAudioSrc] = useState(null);
        const [loading, setLoading] = useState(false);
        const model = "tts-1-hd"; 
        const navigate = useNavigate();

        const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);

          try {
            const audioBase64 = await generateSpeech(text, model, voice);

            const binaryString = atob(audioBase64);
            const binaryLen = binaryString.length;
            const bytes = new Uint8Array(binaryLen);
            for (let i = 0; i < binaryLen; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }

            const audioBlob = new Blob([bytes], { type: "audio/mp3" });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioSrc(audioUrl);
          } catch (error) {
            console.error("Error generating speech:", error);
          } finally {
            setLoading(false);
          }
        };

  return (
    <StyledContainer>
      <BackgroundVideo autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </BackgroundVideo>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </Button>
      <br></br>
      <Typography variant="h4" gutterBottom>
        Text-to-Speech Generator
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <TextField
            label="Enter text"
            multiline
            rows={4}
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            inputProps={{
              style: { backgroundColor: "01adb9", color: "#000" },
            }}
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Select Voice</InputLabel>
          <Select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            label="Select Voice"
          >
            <MenuItem value="alloy">Alloy</MenuItem>
            <MenuItem value="echo">Echo</MenuItem>
            <MenuItem value="fable">Fable</MenuItem>
            <MenuItem value="onyx">Onyx</MenuItem>
            <MenuItem value="nova">Nova</MenuItem>
            <MenuItem value="shimmer">Shimmer</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Generate Speech"}
        </Button>
      </form>

      {audioSrc && (
        <div className="audio-player" style={{ marginTop: "1rem" }}>
          <Typography variant="h6">Generated Speech</Typography>
          <audio controls src={audioSrc}></audio>
        </div>
      )}
    </StyledContainer>
  );
      };;

export default TextToSpeechPage;
