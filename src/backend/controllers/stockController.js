const db = require('../models/db');
/**
 * 获取所有股票
 */
exports.getAllStocks = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM stock_info');
    res.status(200).json(
        {
            success: true,
            data: rows
        });
  } catch (err) {
    console.error('Error fetching stock:', err);
    res.status(500).json({message: 'Failed to fetch stocks', error: err.message});
  }
};
// 根据股票代码获取单个股票信息
exports.getStockBySymbol = async (req, res) => {
  try {
    const { symbol } = req.params;
    const [rows] = await db.query('SELECT * FROM stock_info WHERE symbol = ?', [symbol]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: '股票信息未找到' });
    }

    res.status(200).json(
        {
        success: true,
        data: rows[0]
        });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// 添加新股票信息
exports.createStock = async (req, res) => {
  try {
    const { symbol, company_name, price, change_val, percent_change, volume } = req.body;

    // 简单验证
    if (!symbol || !company_name || !price) {
      return res.status(400).json({ message: '股票代码、公司名称和价格为必填项' });
    }

    const [result] = await db.query(
        'INSERT INTO stock_info (symbol, company_name, price, change_val, percent_change, volume) VALUES (?, ?, ?, ?, ?, ?)',
        [symbol, company_name, price, change_val, percent_change, volume]
    );

    res.status(201).json(
        {
        success: true,
        message: '股票信息添加成功',
        stockId: result.insertId
        });
  } catch (error) {
    res.status(500).json(
        {
        success: false,
          error: error.message });
  }
};
// 删除股票信息
exports.deleteStock = async (req, res) => {
  try {
    const { symbol } = req.params;
    const [result] = await db.query('DELETE FROM stock_info WHERE symbol = ?', [symbol]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '股票信息未找到' });
    }

    res.status(200).json(
        {
          success: true,
          message: '股票信息删除成功' });
  } catch (error) {
    res.status(500).json(
        {
            success: false,
          error: error.message });
  }
};
