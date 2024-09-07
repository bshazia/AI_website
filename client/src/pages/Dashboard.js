// src/pages/Dashboard.js
import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { Helmet } from "react-helmet"; // Import Helmet for managing meta tags
import { AuthContext } from "../contexts/AuthContext"; 
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { isAuthenticated, loading, logout } = useContext(AuthContext); // Add logout from AuthContext
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated; // Define isLoggedIn using isAuthenticated


  const sanitizedContent = "<p></p>"; 

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/"); // Redirect to home after logout
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/"); // Redirect to home page if not authenticated
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking auth status
  }

  return (
    <>
      {/* Add Helmet to manage meta tags and other head elements */}
      <Helmet>
        <title>AI Tools for All</title>
      </Helmet>

      <div className="dashboard-page">
        <header>
          <div className="dash-container">
            <Link to="/" className="logo">
              <b>AI</b> for <b>Gen Z</b>
            </Link>
            <ul className="dashboard-page__header links">
              <li>
                <Link to="/imageservice">Image Tools</Link>
              </li>
              <li>
                <Link to="/chatgpt">Freedom AI</Link>
              </li>
              <li>
                <Link to="/article">Writing Tools</Link>
              </li>
              <li>
                <Link to="/video">Video Tools</Link>
              </li>

              {isLoggedIn && (
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </header>
        <div className="content">
          <div className="container">
            <div className="info">
              <h1>Looking For Inspiration</h1>
              <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            </div>
            <div className="image">
              <img
                src="https://i.postimg.cc/65QxYYzh/001234.png"
                alt="Inspiration"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
