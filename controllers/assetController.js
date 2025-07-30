const pool = require('../database/connection');

/**
 * @swagger
 * /api/assets/findAllAssets/{userId}:
 *   get:
 *     summary: Get all assets for a specific user by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: A list of user assets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 timestamp:
 *                   type: string
 *       400:
 *         description: Invalid user ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       500:
 *         description: Failed to fetch assets for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
exports.getAssetsByUserId = async (req, res) => {
  const { userId } = req.params;

  // Input validation
  if (!/^\d+$/.test(userId)) {
    return res
      .status(400)
      .json({ success: false, error: 'Invalid user ID format' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM user_assets WHERE user_id = ?',
      [userId]
    );
    return res.json({
      success: true,
      data: rows,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching assets:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch assets for the user',
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * @swagger
 * /api/assets/totalAssetsHistoryInfo/{userId}:
 *   get:
 *     summary: Get history of total assets for a specific user by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: A list of total assets history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 timestamp:
 *                   type: string
 *       400:
 *         description: Invalid user ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       500:
 *         description: Failed to fetch total assets history for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
exports.getTotalAssetsHistoryInfoByUserId = async (req, res) => {
  const { userId } = req.params;

  // Input validation
  if (!/^\d+$/.test(userId)) {
    return res
      .status(400)
      .json({ success: false, error: 'Invalid user ID format' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, user_id, record_date, total_assets FROM total_profit_history WHERE user_id = ?',
      [userId]
    );
    return res.json({
      success: true,
      data: rows,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching total assets history:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch total assets history for the user',
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * @swagger
 * /api/assets/totalProfitHistoryInfo/{userId}:
 *   get:
 *     summary: Get history of total profit for a specific user by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: A list of total profit history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 timestamp:
 *                   type: string
 *       400:
 *         description: Invalid user ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       500:
 *         description: Failed to fetch total profit history for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
exports.getTotalProfitHistoryInfoByUserId = async (req, res) => {
  const { userId } = req.params;

  // Input validation
  if (!/^\d+$/.test(userId)) {
    return res
      .status(400)
      .json({ success: false, error: 'Invalid user ID format' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, user_id, record_date, total_profit FROM total_profit_history WHERE user_id = ?',
      [userId]
    );
    return res.json({
      success: true,
      data: rows,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching total profit history:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch total profit history for the user',
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * @swagger
 * /api/assets/rate/{userId}:
 *   get:
 *     summary: Get profit rates for each asset type of a specific user by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: A list of profit rates for each asset type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       asset_type:
 *                         type: string
 *                       total_profit:
 *                         type: number
 *                       change:
 *                         type: number
 *                 timestamp:
 *                   type: string
 *       400:
 *         description: Invalid user ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       500:
 *         description: Failed to calculate profit rates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *                 timestamp:
 *                   type: string
 */
exports.getUserAssetProfitRatesByType = async (req, res) => {
  const { userId } = req.params;

  // Input validation
  if (!/^\d+$/.test(userId)) {
    return res
      .status(400)
      .json({ success: false, error: 'Invalid user ID format' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT
         asset_type,
         SUM(purchase_price * quantity) AS total_cost,
         SUM(current_price * quantity) AS total_current
       FROM user_assets
       WHERE user_id = ?
       GROUP BY asset_type`,
      [userId]
    );

    const result = rows.map(row => {
      const totalCost = Number(row.total_cost);
      const totalCurrent = Number(row.total_current);
      return {
        asset_type: row.asset_type,
        total_profit: totalCurrent - totalCost, // total profit
        change: totalCost > 0 ? (totalCurrent - totalCost) / totalCost : null,
      };
    });

    return res.status(200).json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Error calculating profit rates:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Statistics failed',
      error: err.message,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * @swagger
 * /api/assets/add:
 *   post:
 *     summary: 新增资产
 *     tags:
 *       - 资产管理
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 default: 1
 *                 description: 用户 ID，默认值为 1
 *               asset_type:
 *                 type: string
 *                 description: 资产类型，如 stock、bond 等
 *               asset_code:
 *                 type: string
 *                 description: 资产代码
 *               asset_name:
 *                 type: string
 *                 description: 资产名称
 *               quantity:
 *                 type: number
 *                 description: 资产数量
 *               purchase_price:
 *                 type: number
 *                 description: 买入价格
 *               current_price:
 *                 type: number
 *                 description: 当前价格
 *               purchase_date:
 *                 type: string
 *                 format: date
 *                 description: 买入日期，格式为 YYYY - MM - DD
 *             required:
 *               - asset_type
 *               - asset_code
 *               - asset_name
 *               - quantity
 *               - purchase_price
 *               - current_price
 *               - purchase_date
 *     responses:
 *       200:
 *         description: 资产添加成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     user_id:
 *                       type: integer
 *                     asset_type:
 *                       type: string
 *                     asset_code:
 *                       type: string
 *                     asset_name:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     purchase_price:
 *                       type: number
 *                     current_price:
 *                       type: number
 *                     purchase_date:
 *                       type: string
 *                       format: date
 *                 message:
 *                   type: string
 *       400:
 *         description: 请求参数错误
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: 服务器内部错误
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

exports.addAsset = async (req, res) => {
  try {
    // 从请求体获取资产数据（前端需要传递这些字段）
    const {
      user_id = 1, // 默认user1
      asset_type,
      asset_code,
      asset_name,
      quantity,
      purchase_price,
      current_price,
      purchase_date
    } = req.body;

    // 基本参数校验
    if (!asset_type || !asset_code || !asset_name || !quantity || !purchase_price || !current_price || !purchase_date) {
      return res.status(400).json({
        success: false,
        message: '请填写完整的资产信息'
      });
    }

    // 插入数据库
    const query = `
      INSERT INTO user_assets
        (user_id, asset_type, asset_code, asset_name, quantity, purchase_price, current_price, purchase_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(query, [
      user_id,
      asset_type,
      asset_code,
      asset_name,
      quantity,
      purchase_price,
      current_price,
      purchase_date
    ]);
// 获取刚插入的完整数据（使用自增ID查询）
    const selectQuery = `
      SELECT * FROM user_assets
      WHERE id = ?
    `;
    const [rows] = await pool.query(selectQuery, [result.insertId]);
    const newAsset = rows[0]; // 提取查询到的新记录


    // 返回新增的资产ID
    res.status(200).json({
      success: true,
      data: newAsset,
      message: '资产添加成功'
      //timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('新增资产失败：', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误'
    });
  }
};
