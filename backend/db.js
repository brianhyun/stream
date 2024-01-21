const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database (create it if it doesn't exist)
const db = new sqlite3.Database("mydatabase.db");

module.exports = db;
