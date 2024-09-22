import React, { useState, useRef, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import "../../styles/Rotate.css"; // AI robotic-themed styles

function Rotate() {
  const [image, setImage] = useState(null);
  const [rotate, setRotate] = useState(0);
  const editorRef = useRef(null);

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage(URL.createObjectURL(file));
      };
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleRotateLeft = () => setRotate((prev) => (prev - 90) % 360);
  const handleRotateRight = () => setRotate((prev) => (prev + 90) % 360);

  const handleDownload = () => {
    if (editorRef.current) {
      editorRef.current.getImageScaledToCanvas().toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "rotated-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, "image/png");
    }
  };

  return (
    <div className="rotate-container ai-theme">
      <h1 className="title">AI-Powered Image Rotation</h1>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {image && (
        <div className="editor-container">
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={250}
            height={250}
            border={50}
            color={[34, 34, 34, 0.8]} // Dark robotic theme
            rotate={rotate}
          />
          <div className="controls">
            <button
              onClick={handleRotateLeft}
              className="rotate-button ai-button"
            >
              Rotate Left
            </button>
            <button
              onClick={handleRotateRight}
              className="rotate-button ai-button"
            >
              Rotate Right
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

export default Rotate;
