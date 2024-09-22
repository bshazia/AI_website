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
    setImageUrl(""); // Clear previous image

    try {
      const response = await generateDalleImage(prompt);
      setImageUrl(response.imageUrl); // Update image URL
    } catch (error) {
      alert(error.message || "Error generating image, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "generated-image.png";
    link.click();
  };

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
    if (imageUrl) {
      setImageUrl(""); // Clear generated image when user types again
    }
  };

  return (
    <div
      className="text-to-image-page"
      style={{
        backgroundColor: "#0d0d0d",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Roboto, sans-serif",
        overflowY: "auto", // Enable scrolling
        position: "relative",
      }}
    >
      {/* AI-themed background */}
      <div
        className="ai-theme-background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          backgroundImage: "radial-gradient(circle at 50% 50%, #222, #000)",
          opacity: 0.7,
        }}
      />

      {/* Back button */}
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
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          transition: "transform 0.3s",
        }}
      >
        &larr;
      </button>

      {/* Input section */}
      <div
        className="input-section"
        style={{
          marginTop: "80px",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <textarea
          value={prompt}
          onChange={handleInputChange}
          placeholder="Enter your image description"
          style={{
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            minHeight: "100px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
            fontSize: "16px",
            fontFamily: "Roboto, sans-serif",
          }}
        />

        <button
          onClick={handleGenerateImage}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#444" : "#00bfff",
            color: "#fff",
            borderRadius: "8px",
            padding: "15px 30px",
            fontSize: "18px",
            cursor: "pointer",
            border: "none",
            transition: "background-color 0.3s ease",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>

        {/* Display the generated image */}
        {imageUrl && (
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <img
              src={imageUrl}
              alt="Generated"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "12px",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.7)",
              }}
            />
            <button
              onClick={handleDownloadImage}
              style={{
                marginTop: "20px",
                backgroundColor: "#28a745",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                transition: "background-color 0.3s ease",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToImagePage;
