const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController.js');
const path = require('path');
// 定义路由，调用对应的控制器方法

router.get('/asset/:userId', assetController.getAssetsByUserId); // 获取某用户资产数据
router.get('/asset', assetController.getAllAssets); // 获取所有资产数据
router.get('/asset/:userId/:assetType', assetController.getAssetsByUserIdAndType); // 获取某用户某资产类别数据
// router.get('/rate/:userId/:assetType', assetController.getProfitRate); // 计算某用户某类型资产的总收益率
router.get('/rate/:userId', assetController.getUserAssetTypeProfitRates); // 计算某用户所有资产类型分别的总收益率
router.get('/history/:userId', assetController.getUserTotalAssetHistory); // 获取某用户所有资产的历史数据

module.exports = router;
