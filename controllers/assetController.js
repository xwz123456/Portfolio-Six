const pool = require('../database/connection');

// Get all assets for a specific user by user ID
exports.getAssetsByUserId = async (req, res) => {
    const { userId } = req.params;

    // Input validation
    if (!/^\d+$/.test(userId)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM user_assets WHERE user_id = ?', [userId]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching assets:', error.message);
        res.status(500).json({ error: 'Failed to fetch assets for the user' });
    }
};

// Get history of total assets for a specific user by user ID
exports.getTotalAssetsHistoryInfoByUserId = async (req, res) => {
    const { userId } = req.params;

    // Input validation
    if (!/^\d+$/.test(userId)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }

    try {
        const [rows] = await pool.query(
            'SELECT id, user_id, record_date, total_assets FROM total_profit_history WHERE user_id = ?',
            [userId]
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching total assets history:', error.message);
        res.status(500).json({ error: 'Failed to fetch total assets history for the user' });
    }
};

// Get history of total profit for a specific user by user ID
exports.getTotalProfitHistoryInfoByUserId = async (req, res) => {
    const { userId } = req.params;

    // Input validation
    if (!/^\d+$/.test(userId)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }

    try {
        const [rows] = await pool.query(
            'SELECT id, user_id, record_date, total_profit FROM total_profit_history WHERE user_id = ?',
            [userId]
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching total profit history:', error.message);
        res.status(500).json({ error: 'Failed to fetch total prifit history for the user' });
    }
};

