const express = require('express');
const cors = require('cors');
const config = require('./config/config'); // Update path to configuration
const assetRoutes = require('./routes/assetRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // 使用 express 内置的 JSON 解析

// Add logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Log the current environment
console.log(`Running in ${process.env.NODE_ENV} mode`);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Portfolio Management API');
});

// Routes
app.use('/api/assets', assetRoutes); // Ensure asset routes are included

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error('全局错误:', err);
    res.status(500).json({ error: '服务器内部错误' });
});

// Start the server
const PORT = config.port || 5000; // Use port from config
app.listen(PORT, () => {
    console.log(`Financial Portfolio Backend Server is running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});
