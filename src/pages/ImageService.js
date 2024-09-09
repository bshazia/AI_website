import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ImageService.css";

// Import the service components
import RotateImage from "../components/imagecomponents/Rotate";
import CropImage from "../components/imagecomponents/Crop";
import ChangeFileType from "../components/imagecomponents/ImageConverter";


const imageServiceItems = [
  { label: "Rotate Image", component: <RotateImage /> },
  { label: "Crop Image", component: <CropImage /> },
  { label: "Change File Type", component: <ChangeFileType /> },
];

function ImageService() {
  const [selectedServiceComponent, setSelectedServiceComponent] = useState(
    imageServiceItems[0].component
  );

  return (
    <div className="image-service">
      <header>
        <div className="container">
          <div className="logo">
            
            <b>AI For Gen Z</b>
          </div>
        
          <Link to="/dashboard">Dashboard Page</Link>
          <ul className="imgser-page__header links">
            {imageServiceItems.map((item, index) => (
              <li
                key={index}
                onClick={() => setSelectedServiceComponent(item.component)}
              >
                <Link to="#">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <div className="content">
        <div className="container">
          <div className="info">
            <h1>AI Image Services</h1>
            <p> Your Free image processing Journey With Us.</p>
          </div>
          <div className="image">{selectedServiceComponent}</div>
        </div>
      </div>
    </div>
  );
}

export default ImageService;
