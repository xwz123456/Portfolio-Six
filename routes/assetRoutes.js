const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

// Define asset-related routes
router.get(':userId', assetController.getAssetsByUserId); // New route to fetch assets by user ID

module.exports = router;