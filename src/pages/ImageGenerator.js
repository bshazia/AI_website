import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "../styles/ImageGenerator.module.css"; // Import CSS module
import backgroundVideo from "../background.mp4"; 
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import back icon
import IconButton from "@mui/material/IconButton"; // Import IconButton from MUI

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false); // Manage loading state
  const navigate = useNavigate(); // Initialize navigate

  // Fetch CSRF token when the component mounts
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
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleGenerateImage = async () => {
    if (!prompt) {
      alert("Please enter a prompt!");
      return;
    }

    setLoading(true); // Start loading when request begins

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/images/generate`,
        { prompt },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      if (response.data.imageUrl) {
        setImageUrl(response.data.imageUrl);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image");
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  const handleGoBack = () => {
    navigate("/dashboard"); // Navigate to the dashboard
  };

  return (
    <div className={styles.imageGeneratorContainer}>
      <video autoPlay loop muted className={styles.backgroundVideo}>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.imageGeneratorBox}>
        <div className={styles.overlay}></div>
        <IconButton
          onClick={handleGoBack}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "#90caf9", // You can customize the color
            zIndex: 1000, // Ensure the button is above other elements
          }}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <h2 className={styles.title} style={{ marginTop: "60px" }}>
          AI Image Generator
        </h2>{" "}
        {/* Added margin to create space above the title */}
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
          className={styles.promptInput}
          disabled={loading} // Disable input while generating
        />
        <button
          type="submit"
          disabled={loading} // Disable button while loading
          onClick={handleGenerateImage}
          className={styles.generateButton}
        >
          {loading ? "Generating..." : "Generate Image"}{" "}
          {/* Button text changes based on loading state */}
        </button>
        {imageUrl && (
          <div className={styles.imageDisplay}>
            <h2 className={styles.imageTitle}>Generated Image:</h2>
            <img
              src={imageUrl}
              alt="Generated"
              className={styles.generatedImage}
            />
            <button
              className={styles.downloadButton}
              onClick={() => {
                const link = document.createElement("a");
                link.href = imageUrl;
                link.download = "generated-image.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
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

export default ImageGenerator;
