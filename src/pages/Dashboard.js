import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthContext } from "../contexts/AuthContext";

import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/system";
import DOMPurify from "dompurify";

// Styled components for AI/robotic theme with gradient and sticky header
const Header = styled("header")({
  background: "linear-gradient(90deg, #0f0c29, #302b63, #24243e)", // Gradient background
  padding: "20px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
  position: "sticky",
  top: 0,
  zIndex: 1000,
});

const Logo = styled(Typography)({
  fontWeight: "bold",
  color: "#fff", // White text for logo
  marginBottom: "20px",
});

const NavLink = styled(Link)({
  textDecoration: "none",
  color: "#21D4FD", // Bright cyan color for links
  fontWeight: "500",
  margin: "0 15px",
  "&:hover": {
    textDecoration: "underline",
    color: "#B721FF", // Hover effect with purple color
  },
});

const LogoutButton = styled(Button)({
  backgroundColor: "#ff4d4d",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#e04343",
  },
});

const ContentSection = styled(Box)({
  textAlign: "center",
  marginTop: "40px",
  color: "#fff", // Text color in white for dark theme
});

const Dashboard = () => {
  const { isAuthenticated, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated;

  // Sanitize dynamic HTML content
  const sanitizedContent = DOMPurify.sanitize(
    "<p>Welcome to your AI dashboard! Explore the tools and features available to you.</p>"
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const features = [
    {
      title: "Image Tools",
      link: "/imageservice",
      description: "Edit and enhance images with AI-driven tools.",
    },
    {
      title: "AI Chat",
      link: "/chatgpt",
      description: "Engage in conversation with AI for quick insights.",
    },

    {
      title: "Video Summarization",
      link: "/summarize",
      description: "Convert video content into text summaries.",
    },

    {
      title: "AI Image Generator",
      link: "/ai-image-generator",
      description: "Create unique AI-generated images.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>AI Tools for All</title>
        <meta
          httpEquiv="Content-Security-Policy"
          content="
      default-src 'self';
      connect-src 'self' https://aitool4all.com http://localhost:5000 https://api.openai.com https://api.openai.com/v1/completions;
      script-src 'self';
      img-src 'self' data: blob: https://oaidalleapiprodscus.blob.core.windows.net;
      frame-src 'self';
      font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
      style-src 'self' 'unsafe-inline';
    "
        />
      </Helmet>

      <Header>
        <Container>
          <Logo variant="h4">AI For Gen Z</Logo>
          <Box display="flex" justifyContent="center" alignItems="center">
            {features.map((feature, index) => (
              <NavLink key={index} to={feature.link}>
                {feature.title}
              </NavLink>
            ))}
            {isLoggedIn && (
              <LogoutButton onClick={handleLogout} variant="contained">
                Logout
              </LogoutButton>
            )}
          </Box>
        </Container>
      </Header>
  
      <Container>
        <ContentSection>
          <Typography variant="h4" component="h1" gutterBottom>
            Explore AI-Powered Tools
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </ContentSection>

        <Box mt={4}>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    background: "linear-gradient(145deg, #1e1e2f, #23253d)",
                    color: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {feature.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={feature.link}
                    >
                      Go to {feature.title}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
