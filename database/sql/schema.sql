-- SQL script to create tables for the Portfolio Management project

--Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- User Assets table
CREATE TABLE user_assets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  asset_type ENUM('stock', 'bond', 'fund', 'crypto') NOT NULL,
  asset_code VARCHAR(20) NOT NULL COMMENT '股票代码/基金代码等 (仅允许字母和数字)',
  asset_name VARCHAR(50) NOT NULL COMMENT '股票名称/基金名称等',
  quantity DECIMAL(15,2) NOT NULL,
  purchase_price DECIMAL(15,2) NOT NULL COMMENT '买入价格',
  current_price DECIMAL(15,2) NOT NULL COMMENT '当前价格',
  total_profit DECIMAL(15,2) AS ((current_price - purchase_price) * quantity) COMMENT '当前资产总收益', -- Added total_profit as a computed column
  purchase_date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_asset (user_id, asset_type)
) ENGINE=InnoDB;

-- Total Profit History table
CREATE TABLE total_profit_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  record_date DATE NOT NULL,
  total_assets DECIMAL(15,2) NOT NULL COMMENT '总资产价值',
  total_profit DECIMAL(15,2) NOT NULL COMMENT '累计收益',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_user_date (user_id, record_date)
) ENGINE=InnoDB;
