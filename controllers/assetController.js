const pool = require('../database/connection');

// Get all assets for a specific user by user ID
exports.getAssetsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM user_assets WHERE user_id = ?', [userId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assets for the user' });
    }
};