// components/TextProcessingPage.js
import React, { useState } from "react";
import {
  extractTextFromPDF,
  extractTextFromWord,
  extractTextFromURL,
} from "../services/textExtractionService";
import { summarizeText } from "../services/textSummarizationService";
import { generateOpenAISummary } from "../services/openaiTextService";
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
const TextProcessingPage = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [summaryLength, setSummaryLength] = useState("short");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const processText = async () => {
    setLoading(true);
    setSummary("");
    try {
      let extractedText = "";
      if (file) {
        if (file.type === "application/pdf") {
          extractedText = await extractTextFromPDF(file);
        } else if (
          file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          extractedText = await extractTextFromWord(file);
        }
      } else if (url) {
        extractedText = await extractTextFromURL(url);
      }

      setText(extractedText);

      // First, summarize the text using the internal method
      let summaryText = await summarizeText(extractedText, summaryLength);

      // Next, optimize the summary using OpenAI
      let optimizedSummary = await generateOpenAISummary(summaryText);

      // Set the final optimized summary
      setSummary(optimizedSummary);
    } catch (error) {
      alert("Error processing text, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="text-processing-page"
      style={{
        backgroundColor: "#1f1f1f",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <BackgroundVideo autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </BackgroundVideo>
      <div className="input-section">
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          style={{ display: "block", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={handleUrlChange}
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "10px",
            width: "100%",
            borderRadius: "8px",
            backgroundColor: "#333",
            color: "#fff",
          }}
        />
        <select
          value={summaryLength}
          onChange={(e) => setSummaryLength(e.target.value)}
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "10px",
            width: "100%",
            borderRadius: "8px",
            backgroundColor: "#333",
            color: "#fff",
          }}
        >
          <option value="short">Short Summary</option>
          <option value="detailed">Detailed Summary</option>
        </select>

        <button
          onClick={processText}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#444" : "#000",
            color: "#fff",
            borderRadius: "8px",
            padding: "10px 20px",
          }}
        >
          {loading ? "Processing..." : "Generate Summary"}
        </button>
        {text && (
          <div style={{ marginTop: "20px" }}>
            <h3>Extracted Text</h3>
            <p>{text}</p>
          </div>
        )}
        {summary && (
          <div style={{ marginTop: "20px" }}>
            <h3>Optimized Summary</h3>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextProcessingPage;
