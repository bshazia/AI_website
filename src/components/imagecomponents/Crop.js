import React, { useState, useRef, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import "../../styles//Crop.css"; // Import the CSS file
function Crop() {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState(""); // State for error messages
  const editorRef = useRef(null);
  const imageUrlRef = useRef(null); // Use a ref to keep track of the URL

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  useEffect(() => {
    return () => {
      if (imageUrlRef.current) {
        URL.revokeObjectURL(imageUrlRef.current); // Cleanup URL
      }
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds 5 MB limit.");
      } else {
        setImage(URL.createObjectURL(file));
      }
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 10)); // Max zoom level of 10
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 1)); // Min zoom level of 1
  };

  const handleDownload = () => {
    if (editorRef.current) {
      editorRef.current.getImageScaledToCanvas().toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "cropped-image.png"; // Download file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); // Clean up URL object
      }, "image/png");
    }
  };

  return (
    <div className="crop-container">
      <h1>Image Crop Here</h1>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {error && <p className="error-message">{error}</p>}
      {image && (
        <div className="editor-container">
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={250}
            height={250}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={scale}
            rotate={0}
          />
          <div className="controls">
            <button onClick={handleZoomOut} className="zoom-button">
              Zoom Out
            </button>
            <button onClick={handleZoomIn} className="zoom-button">
              Zoom In
            </button>
            <button onClick={handleDownload} className="download-button">
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Crop;
