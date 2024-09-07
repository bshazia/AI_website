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
      const query =
        "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
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
};

module.exports = User;
