const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController.js');
const path = require('path');
// 定义路由，调用对应的控制器方法
// 获取所有股票信息
router.get('/stock', stockController.getAllStocks);

// 根据股票代码获取单个股票信息，:symbol 是动态参数
router.get('/stock/:symbol', stockController.getStockBySymbol);

// 新增股票信息
router.post('/stock', stockController.createStock);

// 删除股票信息
router.delete('/stock/:symbol', stockController.deleteStock);


module.exports = router;