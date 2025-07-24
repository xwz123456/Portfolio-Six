const mysql = require('mysql2');

// 创建数据库连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',         // 替换为你的 MySQL 用户名
    password: 'n3u3da!', // 替换为你的 MySQL 密码
    database: 'test',// 确保已创建此数据库
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
