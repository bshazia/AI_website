import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  styled,
} from "@mui/material";

// Import the service components
import RotateImage from "../components/imagecomponents/Rotate";
import CropImage from "../components/imagecomponents/Crop";
import ChangeFileType from "../components/imagecomponents/ImageConverter";
import backgroundVideo from "../background.mp4";
import style from "styled-components";
const BackgroundVideo = style.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;
// Styled components
const Header = styled("header")({
  backgroundColor: "#121212",
  padding: "20px",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
});

const Logo = styled(Typography)({
  fontWeight: "bold",
  color: "#00ffcc", // Robotic theme color
  marginBottom: "10px",
});

const NavLink = styled(Link)({
  textDecoration: "none",
  color: "#00ffcc", // Robotic theme color
  fontWeight: "500",
  marginRight: "20px", // Spacing between links
  "&:hover": {
    textDecoration: "underline",
  },
});

const ServiceTabs = styled(Tabs)({
  marginBottom: "20px",
  "& .MuiTabs-indicator": {
    backgroundColor: "#00ffcc", // Robotic theme color
  },
});

const ServiceTab = styled(Tab)({
  textTransform: "none",
  color: "#fff",
  "&.Mui-selected": {
    color: "#00ffcc", // Robotic theme color
  },
});

const ContentBox = styled(Box)({
  padding: "20px",
  backgroundColor: "#1c1c1c",
  borderRadius: "8px",
  color: "#fff",
  marginTop: "20px", // Add spacing from header
});

const ImageService = () => {
  const [selectedService, setSelectedService] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedService(newValue);
  };

  const serviceComponents = [
    <RotateImage key="rotate" />,
    <CropImage key="crop" />,
    <ChangeFileType key="convert" />,
  ];

  return (
    <div
      className="image-service"
      style={{
        backgroundColor: "#1c1c1c",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <BackgroundVideo autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </BackgroundVideo>
      <Header>
        <Container>
          <Logo variant="h4">AI For Gen Z</Logo>
          <NavLink to="/dashboard">Home Page</NavLink>
          <ServiceTabs
            value={selectedService}
            onChange={handleChange}
            aria-label="image services"
          >
            <ServiceTab label="Rotate Image" />
            <ServiceTab label="Crop Image" />
            <ServiceTab label="Change File Type" />
          </ServiceTabs>
        </Container>
      </Header>

      <Container>
        <ContentBox>
          <Typography variant="h4" component="h1" gutterBottom>
            AI Image Services
          </Typography>
          <Typography variant="body1" paragraph>
            Your free image processing journey with us.
          </Typography>
          {serviceComponents[selectedService]}
        </ContentBox>
      </Container>
    </div>
  );
};

export default ImageService;
