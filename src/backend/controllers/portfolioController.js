const db = require('../models/db');

/**
 * 获取所有项目/资产项
 */
exports.getAllItems = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM portfolio');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ message: 'Failed to fetch items', error: err.message });
  }
};

/**
 * 添加新项目/资产项
 */
exports.addItem = async (req, res) => {
  try {
    const { name, type, value, description } = req.body;

    // 验证必要字段
    if (!name || !type) {
      return res.status(400).json({ message: 'Name and type are required' });
    }

    const [result] = await db.query(
        'INSERT INTO portfolio (name, type, value, description, created_at) VALUES (?, ?, ?, ?, NOW())',
        [name, type, value || 0, description || '']
    );

    // 返回新创建的项目
    const [newItem] = await db.query('SELECT * FROM portfolio WHERE id = ?', [result.insertId]);
    res.status(201).json(newItem[0]);
  } catch (err) {
    console.error('Error adding item:', err);
    res.status(500).json({ message: 'Failed to add item', error: err.message });
  }
};

/**
 * 根据 ID 删除项目/资产项
 */
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Item ID is required' });
    }

    const [result] = await db.query('DELETE FROM portfolio WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ message: 'Failed to delete item', error: err.message });
  }
};

/**
 * 根路径测试响应
 */
exports.rootResponse = (req, res) => {
  res.status(200).json({
    message: 'Welcome to Portfolio Manager API',
    endpoints: {
      'GET /items': 'Get all portfolio items',
      'POST /items': 'Add a new portfolio item',
      'DELETE /items/:id': 'Delete a portfolio item'
    }
  });
};
