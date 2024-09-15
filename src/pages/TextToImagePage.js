import React, { useState } from "react";
import { generateDalleImage } from "../services/dalleService";
import { useNavigate } from "react-router-dom";

const TextToImagePage = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setImageUrl("");

    try {
      const url = await generateDalleImage(prompt);
      setImageUrl(url);
    } catch (error) {
      alert("Error generating image, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/dashboard"); // Navigate back to Dashboard page
  };

  return (
    <div
      className="text-to-image-page"
      style={{
        backgroundColor: "#1f1f1f",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <button
        onClick={handleGoBack}
        style={{
          backgroundColor: "#007bff", // Back arrow button color
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          padding: "10px",
          cursor: "pointer",
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "24px",
        }}
      >
        &larr;
      </button>
      <div className="input-section" style={{ marginTop: "50px" }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your image description"
          style={{
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            minHeight: "100px",
          }}
        />

        <button
          onClick={handleGenerateImage}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#444" : "#000",
            color: "#fff",
            borderRadius: "8px",
            padding: "10px 20px",
            display: "block",
            marginTop: "20px",
          }}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>

        {imageUrl && (
          <div style={{ marginTop: "20px" }}>
            <img src={imageUrl} alt="Generated" style={{ maxWidth: "100%" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToImagePage;
