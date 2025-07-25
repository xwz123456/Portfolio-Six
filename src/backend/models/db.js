require('dotenv').config();
const mysql = require('mysql2');

// 创建数据库连接池
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 测试数据库连接
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database successfully');
    connection.release(); // 释放连接
});

// 导出 promise 版本的连接池，便于使用 async/await
module.exports = pool.promise();
