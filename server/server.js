const path = require("path");
const express = require("express");
const app = express();
const xss = require("xss-clean");
const helmet = require("helmet");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from the correct .env file based on NODE_ENV
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.development" });
}

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

// Database connection
const db = require("./config/db");

// Middleware to parse JSON requests
app.use(express.json());

// API routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/chatGPTRoutes")); // Add this line for ChatGPT routes

// CSRF token route for your frontend to request the token if needed
app.get("/api/get-csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Serve static files from the React build folder in production only
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../client/build");
  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));

    // Catch-all handler to serve React app in production
    app.get("*", (req, res) => {
      res.sendFile(path.join(buildPath, "index.html"));
    });
  }
}

// Test the database connection and list tables (development only)
if (process.env.NODE_ENV !== "production") {
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
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
