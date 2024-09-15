// src/pages/VideoSummarizationPage.js
import React from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Paper,
  CssBaseline, // Correct import for CssBaseline
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { saveAs } from "file-saver";
import { useVideoSummarization } from "../hooks/useVideoSummarization";

// Create a dark theme using MUI's createTheme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
});

const VideoSummarizationPage = () => {
  const {
    videoUrl,
    setVideoUrl,
    summaryType,
    setSummaryType,
    summary,
    error,
    isLoading,
    handleSummarize,
  } = useVideoSummarization();

  const handleDownload = () => {
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "summary.txt");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Apply global styles including background color */}
      <Paper
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "20px auto",
          backgroundColor: darkTheme.palette.background.paper,
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          Let's Summarrize YouTube Video
        </Typography>
        <TextField
          label="YouTube Video URL"
          variant="outlined"
          fullWidth
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          margin="normal"
          InputLabelProps={{ style: { color: darkTheme.palette.text.primary } }}
        />
        <Select
          value={summaryType}
          onChange={(e) => setSummaryType(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        >
          <MenuItem value="Detailed">Detailed</MenuItem>
          <MenuItem value="Short">Short</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSummarize}
          disabled={isLoading} // Disable the button while loading
          style={{ marginTop: "20px" }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Summarize"}
        </Button>

        {/* Loading message */}
        {isLoading && (
          <Typography
            variant="body2"
            color="secondary"
            style={{ marginTop: "10px" }}
          >
            We are working on your request. Please wait...
          </Typography>
        )}

        {/* Error message */}
        {error && (
          <Typography
            variant="body2"
            color="error"
            style={{ marginTop: "10px" }}
          >
            {error}
          </Typography>
        )}

        {/* Display summary and download button */}
        {summary && (
          <div>
            <Typography
              variant="h6"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Summary
            </Typography>
            <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>
              {summary}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleDownload}
              style={{ marginTop: "10px" }}
            >
              Download Summary
            </Button>
          </div>
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default VideoSummarizationPage;
