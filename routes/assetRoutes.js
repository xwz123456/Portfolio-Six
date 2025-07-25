const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

// Define asset-related routes
router.get('/findAllAssets/:userId', assetController.getAssetsByUserId); // New route to fetch assets by user ID

// get total assets history info by user ID
router.get('/totalAssetsHistoryInfo/:userId', assetController.getTotalAssetsHistoryInfoByUserId); // New route to fetch total assets history by user ID

// get total profit history info by user ID
router.get('/totalProfitHistoryInfo/:userId', assetController.getTotalProfitHistoryInfoByUserId); // Fix typo here

module.exports = router;