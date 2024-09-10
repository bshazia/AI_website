// user.js
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const config = require("../config/config");

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
});

const User = {
  create: async (userData) => {
    const { name, email, password } = userData;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
      const [results] = await pool.execute(query, [
        name,
        email,
        hashedPassword,
      ]);
      return results;
    } catch (error) {
      throw error;
    }
  },

  findByEmail: async (email) => {
    try {
      const query = "SELECT * FROM user WHERE email = ?";
      const [results] = await pool.execute(query, [email]);
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
    try {
          const expiryDate = new Date();
          expiryDate.setMinutes(expiryDate.getMinutes() + 10); // Set expiry to 10 minutes from now

          const query =
            "UPDATE user SET reset_token = ?, reset_token_expiry = ? WHERE email = ?";
          const [results] = await pool.execute(query, [
            token,
            expiryDate,
            email,
          ]);
          return results;
        } catch (error) {
      throw error;
    }
  },
  findByResetToken: async (token) => {
    try {
      const query =
        "SELECT * FROM user WHERE reset_token = ? AND reset_token_expiry > NOW()";
      const [results] = await pool.execute(query, [token]);
      return results[0];
    } catch (error) {
      throw error;
    }
  },
  updatePassword: async (email, newPassword) => {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const query =
        "UPDATE user SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE email = ?";
      const [results] = await pool.execute(query, [hashedPassword, email]);
      return results;
    } catch (error) {
      throw error;
    }
  },
};


module.exports = User;
