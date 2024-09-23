import React, { useState } from "react";
import { extractKeywords } from "../services/keywordExtractionService";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const KeywordExtractionPage = () => {
        const navigate = useNavigate(); // Initialize navigate

        const [text, setText] = useState("");
        const [keywords, setKeywords] = useState(null);
        const [error, setError] = useState("");

        const handleExtract = async () => {
          setError("");
          try {
            const data = await extractKeywords(text);
            setKeywords(data.keywords);
          } catch (err) {
            setError("Error extracting keywords. Please try again.");
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
            <button
              onClick={() => navigate("/dashboard")}
              style={{ marginBottom: "20px" }}
            >
              Back to Dashboard
            </button>
            <h1>Keyword Extraction</h1>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="6"
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <button
              onClick={handleExtract}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
              }}
            >
              Extract Keywords
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {keywords && (
              <div>
                <h3>Extracted Keywords</h3>
                <p>{keywords}</p>
              </div>
            )}
          </div>
        );
      };;

export default KeywordExtractionPage;
