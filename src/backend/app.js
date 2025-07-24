const express = require('express');
const cors = require('cors');
const portfolioRouter = require('./routes/portfolio');
const path = require('path');
// 初始化 Express 应用
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 提供前端静态文件
app.use(express.static(path.join(__dirname, '../frontend')));

// 路由挂载
app.use('/', portfolioRouter); // 根路径直接挂载，便于访问

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;
