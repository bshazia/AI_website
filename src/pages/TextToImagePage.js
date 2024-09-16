import React, { useState } from "react";
import { generateDalleImage } from "../services/dalleService";
import { useNavigate } from "react-router-dom";

const TextToImagePage = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setImageUrl(""); // Clear the previous image

    try {
      const response = await generateDalleImage(prompt); // Generate image and get the URL
      console.log("Generated Image URL:", response);
      setImageUrl(response.imageUrl); // Update the imageUrl state
    } catch (error) {
      alert(error.message || "Error generating image, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/dashboard");
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
          backgroundColor: "#007bff",
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

        {/* Ensure this block is rendered if imageUrl is not empty */}
        {imageUrl && (
          <div style={{ marginTop: "20px" }}>
            <img
              src={imageUrl}
              alt="Generated"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToImagePage;
