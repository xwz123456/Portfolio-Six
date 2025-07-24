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
    queueLimit: 0
});

// Export the pool for use in other parts of the application
module.exports = pool.promise();
