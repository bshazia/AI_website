// src/pages/TextSummarizationPage.js
import React, { useState } from "react";
import { summarizeText } from "../services/textsummaryService";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
const TextSummarizationPage = () => {
        const navigate = useNavigate(); // Initialize navigate

        const [text, setText] = useState("");
        const [summary, setSummary] = useState(null);
        const [error, setError] = useState("");

        const handleSummarize = async () => {
          setError("");
          try {
            const result = await summarizeText(text);
            setSummary(result.summary);
          } catch (err) {
            setError("Error summarizing text. Please try again.");
          }
        };

        return (
          <div
            style={{
              backgroundColor: "#0e0e0e",
              color: "#f0f0f0",
              padding: "20px",
            }}
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
            <h1>Text Summarization</h1>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="4"
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <button
              onClick={handleSummarize}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
              }}
            >
              Summarize
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {summary && (
              <div>
                <h3>Summary</h3>
                <p>{summary}</p>
              </div>
            )}
          </div>
        );
      };;

export default TextSummarizationPage;
