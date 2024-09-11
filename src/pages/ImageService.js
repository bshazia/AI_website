// src/pages/ImageService.js
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

// Styled components
const Header = styled("header")({
  backgroundColor: "#121212",
  padding: "20px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
});

const Logo = styled(Typography)({
  fontWeight: "bold",
  color: "#fff",
  marginBottom: "10px",
});

const NavLink = styled(Link)({
  textDecoration: "none",
  color: "#007bff",
  fontWeight: "500",
  "&:hover": {
    textDecoration: "underline",
  },
});

const ServiceTabs = styled(Tabs)({
  marginBottom: "20px",
  "& .MuiTabs-indicator": {
    backgroundColor: "#007bff",
  },
});

const ServiceTab = styled(Tab)({
  textTransform: "none",
  color: "#fff",
  "&.Mui-selected": {
    color: "#007bff",
  },
});

const ContentBox = styled(Box)({
  padding: "20px",
  backgroundColor: "#1c1c1c",
  borderRadius: "8px",
  color: "#fff",
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
      style={{ backgroundColor: "#1c1c1c", minHeight: "100vh" }}
    >
      <Header>
        <Container>
          <Logo variant="h4">AI For Gen Z</Logo>
          <NavLink to="/dashboard">Dashboard Page</NavLink>
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
