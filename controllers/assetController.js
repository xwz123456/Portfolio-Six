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
        return res.status(400).json({ success: false, error: 'Invalid user ID format' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM user_assets WHERE user_id = ?', [userId]);
        res.json({ success: true, data: rows, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error('Error fetching assets:', error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch assets for the user', timestamp: new Date().toISOString() });
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
        return res.status(400).json({ success: false, error: 'Invalid user ID format' });
    }

    try {
        const [rows] = await pool.query(
            'SELECT id, user_id, record_date, total_assets FROM total_profit_history WHERE user_id = ?',
            [userId]
        );
        res.json({ success: true, data: rows, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error('Error fetching total assets history:', error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch total assets history for the user', timestamp: new Date().toISOString() });
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
        return res.status(400).json({ success: false, error: 'Invalid user ID format' });
    }

    try {
        const [rows] = await pool.query(
            'SELECT id, user_id, record_date, total_profit FROM total_profit_history WHERE user_id = ?',
            [userId]
        );
        res.json({ success: true, data: rows, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error('Error fetching total profit history:', error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch total profit history for the user', timestamp: new Date().toISOString() });
    }
};

