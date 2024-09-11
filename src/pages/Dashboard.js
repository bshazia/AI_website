import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthContext } from "../contexts/AuthContext";
import { Container, Typography, Button, Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import pic from "../images/001234.png";
import DOMPurify from "dompurify";

// Styled components for the blackish theme
const Header = styled("header")({
  backgroundColor: "#1c1c1c", // Darker header
  padding: "20px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
});

const Logo = styled(Typography)({
  fontWeight: "bold",
  color: "#fff", // White text for logo
  marginBottom: "20px",
});

const NavLink = styled(Link)({
  textDecoration: "none",
  color: "#007bff",
  fontWeight: "500",
  margin: "0 10px",
  "&:hover": {
    textDecoration: "underline",
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
  marginTop: "20px",
  color: "#fff", // Text color in white for dark theme
});

const Image = styled("img")({
  maxWidth: "100%",
  height: "auto",
  borderRadius: "8px",
});

const DarkPaper = styled(Paper)({
  backgroundColor: "#333", // Dark paper background
  padding: "20px",
  textAlign: "center",
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

  return (
    <>
      <Helmet>
        <title>AI Tools for All</title>
        {/* Apply security headers */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self';"
        />
      </Helmet>

      <Header>
        <Container>
          <Logo variant="h4">AI For Gen Z</Logo>
          <Box display="flex" justifyContent="center" alignItems="center">
            <NavLink to="/imageservice">Image Tools</NavLink>
            <NavLink to="/chatgpt">Freedom AI</NavLink>
            <NavLink to="/article">Writing Tools</NavLink>
            <NavLink to="/video">Video Tools</NavLink>
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
            Looking For Inspiration
          </Typography>
          {/* Render sanitized HTML content */}
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </ContentSection>

        <Box mt={4}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              <DarkPaper elevation={3}>
                <Image src={pic} alt="Inspiration" />
              </DarkPaper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
