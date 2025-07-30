const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

// Define asset-related routes
router.get('/findAllAssets/:userId', assetController.getAssetsByUserId);

// get total assets history info by user ID
router.get(
  '/totalAssetsHistoryInfo/:userId',
  assetController.getTotalAssetsHistoryInfoByUserId
);

// get total profit history info by user ID
router.get(
  '/totalProfitHistoryInfo/:userId',
  assetController.getTotalProfitHistoryInfoByUserId
);
router.post('/add', assetController.addAsset); // 添加资产数据(中下添加)
router.delete('/delete/:id', assetController.deleteAsset); // 删除资产数据(中下删除)
router.get('/rate/:userId', assetController.getUserAssetProfitRatesByType); // 计算某用户所有资产类型分别的总收益和总收益率(右上四个框)

module.exports = router;
