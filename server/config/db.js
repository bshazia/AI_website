const mysql = require("mysql2");
const config = require("./config");

const connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
  
});

connection.connect((err) => {
  if (err) {
             console.error("Database connection error:", err.message); // Log the actual error message
             console.log("Database:", config.db.name); // Log database name

             console.error("Error Code:", err.code); // Log the error code for better understanding
             console.error("SQL State:", err.sqlState); // Log SQL State (if available)
             process.exit(1); // Exit the process to prevent running with failed connection
           } else {
    console.log("Connected to the database:", config.db.name); // Show connected DB name
  }
});

module.exports = connection;
