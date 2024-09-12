import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Header from "./Headerp"; // Import the Header component

const MainLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  // Exclude homepage and other specific routes
  const excludeHeaderRoutes = ["/"];

  return (
    <>
      {!excludeHeaderRoutes.includes(location.pathname) && isAuthenticated && (
        <Header />
      )}
      <Outlet />
    </>
  );
};

export default MainLayout;
