const mysql = require('mysql2/promise');
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

// database connection logging
pool.getConnection()
    .then(connection => {
        console.log('数据库连接成功');
        connection.release();
    })
    .catch(err => {
        console.error('数据库连接失败:', err);
        process.exit(1); // 连接失败时退出进程
    });

// Export the pool for use in other parts of the application
module.exports = pool;
