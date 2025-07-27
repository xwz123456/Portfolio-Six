const db = require('../models/db');
// Get all assets for a specific user by user ID
exports.getAssetsByUserId = async (req, res) => {
  const {userId} = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM user_assets WHERE user_id = ?', [userId]);
    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('Error fetching assets:', err);
    res.status(500).json({ message: 'Failed to fetch assets', error: err.message });
  }
};
// getAllAssets
exports.getAllAssets = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM user_assets');
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
// getAssetsByAsset_type
// 获取某用户&某资产类别的数据
exports.getAssetsByUserIdAndType = async (req, res) => {
  const { userId, assetType } = req.params;
  try {
    const [rows] = await db.query(
        'SELECT * FROM user_assets WHERE user_id = ? AND asset_type = ?',
        [userId, assetType]
    );
    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('Error fetching assets by type:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch assets by type',
      error: err.message
    });
  }
};
// 计算某用户所有资产类型分别的总收益率
exports.getUserAssetTypeProfitRates = async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await db.query(
        `SELECT
         asset_type,
         SUM(purchase_price * quantity) AS total_cost,
         SUM(current_price * quantity) AS total_current
       FROM user_assets
       WHERE user_id = ?
       GROUP BY asset_type`,
        [userId]
    );
    //test

    const result = rows.map(row => {
      const totalCost = Number(row.total_cost);
      const totalCurrent = Number(row.total_current);
      return {
        asset_type: row.asset_type,
        total_profit: totalCurrent - totalCost, // 总收益
        return_rate: totalCost > 0 ? ((totalCurrent - totalCost) / totalCost) : null // 百分比
      };
    });

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: '统计失败',
      error: err.message
    });
  }
};
//获取用户时间线上的总资产和总收益
exports.getUserTotalAssetHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await db.query(
        'SELECT total_assets, total_profit, record_date FROM total_profit_history WHERE user_id = ? ORDER BY record_date',
        [userId]
    );
    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: '查询失败',
      error: err.message
    });
  }
};



// //计算某用户某特定类型资产的总收益率
// exports.getProfitRate = async (req, res) => {
//   const { userId, assetType } = req.params;
//   try {
//     const [rows] = await db.query(
//         'SELECT * FROM user_assets WHERE user_id = ? AND asset_type = ?',
//         [userId, assetType]
//     );
//
//     // 计算总投入和总现值
//     let totalCost = 0;
//     let totalCurrent = 0;
//     rows.forEach(asset => {
//       totalCost += Number(asset.purchase_price) * Number(asset.quantity);
//       totalCurrent += Number(asset.current_price) * Number(asset.quantity);
//     });
//
//     // 计算整体收益率
//     let overallReturn = null;
//     if (totalCost > 0) {
//       overallReturn = (totalCurrent - totalCost) / totalCost;
//     }
//
//     res.status(200).json({
//       success: true,
//       data: overallReturn*100 // 返回整体收益率
//       // 例如 0.15 表示 15%
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: '查询失败',
//       error: err.message
//     });
//   }
// };
