import React, { useState, useEffect } from "react";
import { generateVideoService } from "../services/videoService";

const AIVideoGeneratorPage = () => {
  const [image, setImage] = useState(null);
  const [textPrompt, setTextPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/get-csrf-token`,
          {
            method: "GET",
            credentials: "include", // Ensure cookies are sent
          }
        );
        const data = await response.json();
        setCsrfToken(data.csrfToken); // Set CSRF token from backend
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Correctly set the file from input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !textPrompt) return;

    setLoading(true);

    try {
      const videoBlob = await generateVideoService(
        image,
        textPrompt,
        csrfToken
      ); // Pass file directly
      const videoUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(videoUrl); // Create URL for video and display it
    } catch (error) {
      console.error("Error generating video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Video Generator</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Enter your text prompt"
          value={textPrompt}
          onChange={(e) => setTextPrompt(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Video"}
        </button>
      </form>

      {videoUrl && (
        <div>
          <h2>Generated Video:</h2>
          <video src={videoUrl} controls />
        </div>
      )}
    </div>
  );
};

export default AIVideoGeneratorPage;
