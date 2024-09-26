// src/components/Layout.js
import React from "react";
import AccessibilityReader from "./AccessibilityReader";

const Layout = ({ children }) => {

  return (
    <div>
      <AccessibilityReader  /> {/* Always visible */}
      {children} {/* This will render the content of the specific page */}
    </div>
  );
};

export default Layout;
