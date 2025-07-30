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
//add asset

/**
    * @swagger
    * /api/assets/add:
    *   post:
    *     summary: add a new asset for a user
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               user_id:
    *                 type: integer
    *                 description: ID of the user (default is 1)
    *               asset_type:
    *                 type: string
    *                 description: Type of the asset (e.g., stock, bond)
    *               asset_code:
    *                 type: string
    *                 description: Unique code for the asset
    *               asset_name:
    *                 type: string
    *                 description: Name of the asset
    *               quantity:
    *                 type: number
    *                 description: Quantity of the asset
    *               purchase_price:
    *                 type: number
    *                 description: Purchase price per unit of the asset
    *               current_price:
    *                 type: number
    *                 description: Current market price per unit of the asset
    *               purchase_date:
    *                 type: string
    *                 format: date-time
    *                 description: Date when the asset was purchased (ISO 8601 format)
    *     responses:
    *       201:
    *         description: Asset created successfully
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: true
    *                 data:
    *                   type: object
    *                   properties:
    *                     id:
    *                       type: integer
    *                       description: ID of the newly created asset
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

    // 返回新增的资产ID
    res.status(201).json({
      success: true,
      data: { id: result.insertId },
      message: '资产添加成功'
    });
  } catch (error) {
    console.error('新增资产失败：', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误'
    });
  }
};

