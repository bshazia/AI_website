import React, { useState, useEffect, useRef } from "react";
import "../../styles/ImageConverter.css"; // Import specific CSS file for styling

function ImageConverter() {
  const [image, setImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [fileType, setFileType] = useState("image/png"); // Default file type
  const [filename, setFilename] = useState("converted-image.png"); // Default filename
  const [loading, setLoading] = useState(false); // State to manage loading
  const [conversionPending, setConversionPending] = useState(false); // State to manage pending conversion
  const [containerWidth, setContainerWidth] = useState(window.innerWidth * 0.5); // 50% of window width
  const containerRef = useRef(null);

  // Handle resizing of the container
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial resize calculation

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
      setConvertedImage(null); // Clear previous converted image
      setConversionPending(true); // Set pending conversion state
    } else {
      alert("Please select a valid image file.");
    }
  };

  // Handle file type selection
  const handleFileTypeChange = (e) => {
    const type = e.target.value;
    setFileType(type);
    setFilename(`converted-image.${type.split("/")[1]}`);
    if (image) {
      convertImage(); // Trigger conversion when file type changes
    }
  };

  // Convert image to selected file type
  const convertImage = () => {
    setLoading(true); // Start loading
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Convert image to selected file type
      const dataUrl = canvas.toDataURL(fileType);
      setConvertedImage(dataUrl);
      setLoading(false); // End loading
      setConversionPending(false); // Reset conversion pending state
    };
    img.src = image;
  };

  const handleDownload = () => {
    if (convertedImage) {
      const link = document.createElement("a");
      link.href = convertedImage;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("No image available for download.");
    }
  };

  return (
    <div
      className="image-converter ai-theme"
      ref={containerRef}
      style={{ width: "100%" }}
    >
      <h1 className="title">Convert File Type</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input"
      />
      <select
        onChange={handleFileTypeChange}
        value={fileType}
        className="file-type-select"
      >
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPEG</option>
        <option value="image/webp">WEBP</option>
        <option value="image/gif">GIF</option>
        <option value="image/bmp">BMP</option>
        <option value="image/tiff">TIFF</option>
      </select>
      {image && (
        <div className="image-preview">
          <img
            src={image}
            alt="Original"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
      {conversionPending && !loading && (
        <p className="loading-message">
          Select a file type to start conversion...
        </p>
      )}
      {loading && (
        <p className="loading-message">Converting image, please wait...</p>
      )}
      {!loading && convertedImage && (
        <div className="button-container">
          <button
            onClick={handleDownload}
            className="download-button ai-button"
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageConverter;
