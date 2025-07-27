const express = require('express');
const cors = require('cors');
const portfolioRouter = require('./routes/itemRoute');  // items相关路由
const stockRouter = require('./routes/stockRoute'); // 引入stock相关路由
const assetRouter = require('./routes/assetRoute.js'); // 资产相关控制器
const path = require('path');
// 初始化 Express 应用
const app = express();// 创建Express应用实例
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors()); // 启用CORS，允许前端跨域请求
app.use(express.json());// 解析JSON格式的请求体（如前端POST的JSON数据）
app.use(express.urlencoded({ extended: true }));// 解析URL编码的请求体（x-www-form-urlencoded）

// 提供前端静态文件
app.use(express.static(path.join(__dirname, '../display2')));

// 路由挂载
app.use('/items', portfolioRouter); // 根路径直接挂载，便于访问
app.use('/stocks', stockRouter); // stock相关路由挂载到/api路径下
app.use('/assets', assetRouter); // 资产相关路由挂载到/assets路径下


// 启动服务器
app.listen(PORT, () => {
  console.log(`后端启动成功：http://localhost:${PORT}`);
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
