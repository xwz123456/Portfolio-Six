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

module.exports = router;
