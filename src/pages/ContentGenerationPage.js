import React, { useState } from "react";
import { generateContent } from "../services/contentGenerationService";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ContentGenerationPage = () => {
        const [prompt, setPrompt] = useState("");
        const [generatedContent, setGeneratedContent] = useState("");
        const [error, setError] = useState("");
        const navigate = useNavigate(); // Initialize navigate

        const handleGenerate = async () => {
          setError("");
          try {
            const result = await generateContent(prompt);
            setGeneratedContent(result.content);
          } catch (err) {
            setError("Error generating content. Please try again.");
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
            <h1>Content Generation</h1>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows="4"
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <button
              onClick={handleGenerate}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
              }}
            >
              Generate
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {generatedContent && (
              <div>
                <h3>Generated Content</h3>
                <p>{generatedContent}</p>
              </div>
            )}
          </div>
        );
      };;

export default ContentGenerationPage;
