import sqlite3 from "sqlite3";

// Connect to SQLite database (create it if it doesn't exist)
const db = new sqlite3.Database("mydatabase.db");

export default db;
