import React, { useState, useRef, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import "../../styles/Crop.css"; // Apply AI robotic-themed styles

function Crop() {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(window.innerWidth * 0.5); // 50% of the window width
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  useEffect(() => {
    // Cleanup URL object when component unmounts
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  useEffect(() => {
    // Handle window resize to update the container width dynamically
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size calculation

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds 5 MB limit.");
      } else {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        setImage(URL.createObjectURL(file));
      }
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleZoomIn = () => setScale(Math.min(scale + 0.1, 10));
  const handleZoomOut = () => setScale(Math.max(scale - 0.1, 1));

  const handleDownload = () => {
    if (editorRef.current) {
      editorRef.current.getImageScaledToCanvas().toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "cropped-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, "image/png");
    }
  };

  return (
    <div className="crop-container ai-theme">
      <h1 className="title">AI-Powered Image Crop</h1>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {image && (
        <div
          className="editor-container"
          ref={containerRef}
          style={{ width: "100%" }}
        >
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={containerWidth} // Set the width dynamically
            height={containerWidth} // Set height as same to keep aspect ratio square
            border={50}
            color={[34, 34, 34, 0.8]} // Dark robotic theme
            scale={scale}
            rotate={0}
          />
          <div className="controls">
            <button onClick={handleZoomOut} className="zoom-button ai-button">
              Zoom Out
            </button>
            <button onClick={handleZoomIn} className="zoom-button ai-button">
              Zoom In
            </button>
            <button
              onClick={handleDownload}
              className="download-button ai-button"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Crop;
