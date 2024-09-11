const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });


const config = {
  port: process.env.PORT,
  apiUrl:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_API_URL,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  jwtSecret: process.env.JWT_SECRET_KEY, // Updated to match the .env file
  openaiApiKey: process.env.OPENAI_API_KEY, // Updated to match the .env file
};

module.exports = config;
