import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateAudiobook } from "../services/audiobookService";
import "../styles/AudiobookGenerator.css";

const AudiobookGenerator = () => {
  const [file, setFile] = useState(null);
  const [audioSrc, setAudioSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate file size and type
    if (file) {
      const maxFileSize = 1 * 1024 * 1024; // 1 MB in bytes
      const allowedTypes = [
        "text/plain",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (file.size > maxFileSize) {
        setError("File size exceeds 1 MB limit. Please upload a smaller file.");
        setLoading(false);
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        setError(
          "Only .txt and .docx file types are allowed. Please upload a valid file."
        );
        setLoading(false);
        return;
      }
    } else {
      setError("No file selected. Please choose a file to upload.");
      setLoading(false);
      return;
    }

    try {
      const audioBase64 = await generateAudiobook(file);
      const binaryString = atob(audioBase64);
      const binaryLen = binaryString.length;
      const bytes = new Uint8Array(binaryLen);
      for (let i = 0; i < binaryLen; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const audioBlob = new Blob([bytes], { type: "audio/mp3" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioSrc(audioUrl);
    } catch (error) {
      console.error("Error generating speech:", error);
      setError("Failed to generate audiobook. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="audiobook-generator">
      <button
        onClick={() => navigate("/dashboard")}
        style={{ marginBottom: "20px" }}
      >
        Back to Dashboard
      </button>
      <h1>Audiobook Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".txt,.docx" // Removed .pdf since only .txt and .docx are allowed
          onChange={handleFileChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Audiobook"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {audioSrc && (
        <div>
          <h2>Generated Audiobook</h2>
          <audio controls src={audioSrc}></audio>
          <a href={audioSrc} download="audiobook.mp3">
            Download Audiobook
          </a>
        </div>
      )}
    </div>
  );
};

export default AudiobookGenerator;
