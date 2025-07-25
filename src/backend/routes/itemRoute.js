const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/itemController');

// 根路径响应
//router.get('/', portfolioController.rootResponse);
// 根路径响应
//router.get('/', (req, res) => {
 //   res.sendFile(path.join(__dirname, '../../frontend/index.html'));
//});
// items相关路由
router.get('/items', portfolioController.getAllItems);
router.post('/items', portfolioController.addItem);
router.delete('/items/:id', portfolioController.deleteItem);

module.exports = router;
