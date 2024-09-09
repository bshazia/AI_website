import React, { useState, useRef, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import "../../styles/Rotate.css"; // Import the CSS file

function Rotate() {
  const [image, setImage] = useState(null);
  const [rotate, setRotate] = useState(0);
  const editorRef = useRef(null);
  const imageUrlRef = useRef(null);

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
      if (imageUrlRef.current) {
        URL.revokeObjectURL(imageUrlRef.current); // Cleanup previous URL
      }
      const url = URL.createObjectURL(file);
      imageUrlRef.current = url;
      setImage(url);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleRotateLeft = () => {
    setRotate((prevRotate) => (prevRotate - 90) % 360); // Rotate left by 90 degrees
  };

  const handleRotateRight = () => {
    setRotate((prevRotate) => (prevRotate + 90) % 360); // Rotate right by 90 degrees
  };

  const handleDownload = () => {
    if (editorRef.current) {
      editorRef.current.getImageScaledToCanvas().toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "rotated-image.png"; // Download file name
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }, "image/png");
    }
  };

  return (
    <div className="rotate-container">
      <h1>Rotate Your Image Here</h1>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {image && (
        <div className="editor-container">
          <div className="canvas-container">
            <AvatarEditor ref={editorRef} image={image} rotate={rotate} />
          </div>
          <div className="controls">
            <button onClick={handleRotateLeft} className="rotate-button">
              Rotate Left
            </button>
            <button onClick={handleRotateRight} className="rotate-button">
              Rotate Right
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

export default Rotate;
