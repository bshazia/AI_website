const bcrypt = require("bcrypt");
// const mysql = require("mysql2/promise");
const pool = require("../config/db"); // Import the pool from db.js

const validator = require("validator"); // For input validation
const config = require("../config/config");

// const pool = mysql.createPool({
//   host: config.db.host,
//   user: config.db.user,
//   password: config.db.password,
//   database: config.db.name,
// });

const User = {
  create: async (userData) => {
    const { name, email, password } = userData;

    // Input validation and sanitization
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }

    const sanitizedEmail = validator.normalizeEmail(email);
    const sanitizedName = validator.escape(name); // Escapes HTML characters

    if (!validator.isLength(password, { min: 6 })) {
      throw new Error("Password must be at least 6 characters long");
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
      const [results] = await pool.execute(query, [
        sanitizedName,
        sanitizedEmail,
        hashedPassword,
      ]);
      return results;
    } catch (error) {
      throw error;
    }
  },

  findByEmail: async (email) => {
    // Input validation
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }

    const sanitizedEmail = validator.normalizeEmail(email);
    
    try {
      const query = "SELECT * FROM user WHERE email = ?";
      const [results] = await pool.execute(query, [sanitizedEmail]);
      return results[0];
    } catch (error) {
      throw error;
    }
  },

  comparePassword: async (inputPassword, hashedPassword) => {
    try {
      return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (error) {
      throw new Error("Password comparison error");
    }
  },

  updateResetToken: async (email, token, expiryDate) => {
    // Validate the email
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }

    const sanitizedEmail = validator.normalizeEmail(email);

    try {
      if (!(expiryDate instanceof Date)) {
        throw new Error("Invalid expiryDate");
      }

      // Token validity should be short
      expiryDate.setMinutes(expiryDate.getMinutes() + 10);
      const expiryDateString = expiryDate.toISOString().slice(0, 19).replace("T", " ");
      
      const query = "UPDATE user SET reset_token = ?, reset_token_expiry = ? WHERE email = ?";
      const [results] = await pool.execute(query, [token, expiryDateString, sanitizedEmail]);
      return results;
    } catch (error) {
      throw error;
    }
  },

  updatePassword: async (email, newPassword) => {
    // Validate and sanitize email
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }

    const sanitizedEmail = validator.normalizeEmail(email);

    // Ensure the new password meets length criteria
    if (!validator.isLength(newPassword, { min: 6 })) {
      throw new Error("Password must be at least 6 characters long");
    }

    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const query = "UPDATE user SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE email = ?";
      const [results] = await pool.execute(query, [hashedPassword, sanitizedEmail]);
      return results;
    } catch (error) {
      throw error;
    }
  },

  findByVerificationToken: async (token) => {
    if (!token || typeof token !== 'string') {
      throw new Error("Invalid token");
    }

    try {
      const query = "SELECT * FROM user WHERE verification_token = ? AND verification_token_expiry > ?";
      const [results] = await pool.execute(query, [token, new Date()]);
      return results[0]; // Return the first user found
    } catch (error) {
      throw error;
    }
  },

  updateVerificationToken: async (email, token, expiry) => {
    // Validate and sanitize email
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }

    const sanitizedEmail = validator.normalizeEmail(email);

    try {
      const query = "UPDATE user SET verification_token = ?, verification_token_expiry = ? WHERE email = ?";
      const [results] = await pool.execute(query, [token, expiry, sanitizedEmail]);
      return results;
    } catch (error) {
      throw error;
    }
  },

  verifyUserEmail: async (userId) => {
    if (!validator.isInt(userId.toString())) {
      throw new Error("Invalid user ID");
    }

    try {
      const query = "UPDATE user SET email_verified = 1, verification_token = NULL, verification_token_expiry = NULL WHERE id = ?";
      const [results] = await pool.execute(query, [userId]);
      return results;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = User;
