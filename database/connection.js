const mysql = require('mysql2');
const config = require('../config/config'); // Load environment-specific config

// Create a connection pool
const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the database connection
pool.getConnection(err => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Database connected successfully');
  }
});

// Export the pool for use in other parts of the application
module.exports = pool.promise();
