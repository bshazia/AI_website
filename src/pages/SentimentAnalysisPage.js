import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { analyzeSentiment } from "../services/sentimentApi";
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
const SentimentAnalysisPage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setError("");
    try {
      const sentimentResult = await analyzeSentiment(text);
      setResult(sentimentResult);
    } catch (err) {
      setError("Error analyzing sentiment. Please try again.");
    }
  };

  return (
    <div
      style={{ backgroundColor: "#0e0e0e", color: "#f0f0f0", padding: "20px" }}
    >
      <BackgroundVideo autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </BackgroundVideo>
      <button
        onClick={() => navigate("/dashboard")}
        style={{ marginBottom: "20px" }}
      >
        Back to Dashboard
      </button>
      <h1>Sentiment Analysis</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button
        onClick={handleAnalyze}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
        }}
      >
        Analyze
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <h3>Result</h3>
          <p>
            <strong>Score:</strong> {result.score}
          </p>
          <p>
            <strong>Comparative:</strong> {result.comparative}
          </p>
          <h4>Detailed Breakdown:</h4>
          <p>
            <strong>Positive Words:</strong>{" "}
            {result.positive.join(", ") || "None"}
          </p>
          <p>
            <strong>Negative Words:</strong>{" "}
            {result.negative.join(", ") || "None"}
          </p>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysisPage;
