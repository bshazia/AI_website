import React, { useState } from "react";
import readerService from "../services/readerService"; // Import the service

const AccessibilityReader = () => {
  const [voiceType, setVoiceType] = useState("default");
  const [reading, setReading] = useState(false);

  const handleReadAloud = async () => {
    const text = document.body.innerText; // Capture the page content as text
    setReading(true);
    try {
      const audioBlob = await readerService.getSpokenContent(text); // Use service to get audio
      const audio = new Audio(URL.createObjectURL(new Blob([audioBlob])));
      audio.play();
    } catch (error) {
      console.error("Error reading aloud", error);
    } finally {
      setReading(false);
    }
  };

  return (
    <div>
      <h3>Accessibility Reader</h3>
      {/* <label>Select Voice:</label>
      <select value={voiceType} onChange={(e) => setVoiceType(e.target.value)}>
        <option value="default">Default</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select> */}
      <button
        onClick={handleReadAloud}
        disabled={reading}
      >
        {reading ? "Reading..." : "Read Aloud"}
      </button>
    </div>
  );
};

export default AccessibilityReader;
