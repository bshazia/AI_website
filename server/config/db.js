const mysql = require("mysql2/promise");
const config = require("./config");

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
  waitForConnections: true,
  connectionLimit: 10, // Adjust as needed
  queueLimit: 0,
});

// Optionally, test the connection when the server starts
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the database:", config.db.name);
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit the process if the connection fails
  }
})();

module.exports = pool;
