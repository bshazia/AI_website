const path = require("path");
const express = require("express");
const app = express();
const xss = require("xss-clean");
const helmet = require("helmet");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const cors = require("cors");
const config = require("./config/config"); // Updated path to config file

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow credentials (like cookies, authorization headers)
  })
);

// Middleware for cookies
app.use(cookieParser());

// Middleware for CSRF protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken(); // Include the CSRF token in all responses
  next();
});

// Security middleware
app.use(helmet());
app.use(xss());

// Middleware to parse JSON requests
app.use(express.json());

// API routes
app.use("/api", require("./routes/authRoutes")); // Updated path
app.use("/api", require("./routes/chatGPTRoutes")); // Updated path

// CSRF token route for your frontend to request the token if needed
app.get("/api/get-csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Serve static files from the React build folder in production only
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../AIapp/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../AIapp/build", "index.html"));
  });
}


// Test the database connection and list tables (development only)
if (process.env.NODE_ENV !== "production") {
  const db = require("./config/db"); // Ensure database connection is required here
  db.query("SHOW TABLES", (err, results) => {
    if (err) {
      console.error("Error listing tables:", err);
    } else {
      // console.log("Tables in the database:", results);
    }
  });
}

// Error handling middleware (only for production)
if (process.env.NODE_ENV === "production") {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });
}

// Start the server
const logger = require("./config/logger");
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
