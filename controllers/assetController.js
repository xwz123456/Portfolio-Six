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