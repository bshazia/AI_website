import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Paper,
  CssBaseline,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  const navigate = useNavigate();

  const handleDownload = () => {
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "summary.txt");
  };

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {/* Make the entire container scrollable */}
      <div
        style={{
          minHeight: "100vh",
          overflowY: "auto", // Enables vertical scrolling
          backgroundColor: darkTheme.palette.background.default,
          padding: "20px",
        }}
      >
        <Paper
          style={{
            padding: "20px",
            maxWidth: "800px",
            margin: "20px auto",
            backgroundColor: darkTheme.palette.background.paper,
            position: "relative", // Ensure relative positioning for the back button
            paddingTop: "80px", // Added padding to push down the content
          }}
        >
          {/* Back Button */}
          <IconButton
            onClick={handleGoBack}
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              color: "#90caf9", // Matching the primary color of the theme
            }}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>

          <Typography variant="h4" color="primary" gutterBottom>
            Let's Summarize YouTube Video
          </Typography>

          {/* Input Fields */}
          <TextField
            label="YouTube Video URL"
            variant="outlined"
            fullWidth
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            margin="normal"
            InputLabelProps={{
              style: { color: darkTheme.palette.text.primary },
            }}
          />

          <Select
            value={summaryType}
            onChange={(e) => setSummaryType(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
            style={{
              marginTop: "10px",
              color: darkTheme.palette.text.primary,
              backgroundColor: darkTheme.palette.background.paper,
            }}
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
      </div>
    </ThemeProvider>
  );
};

export default VideoSummarizationPage;
