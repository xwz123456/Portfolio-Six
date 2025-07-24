-- 创建数据库
CREATE DATABASE IF NOT EXISTS portfolio_db2;
USE portfolio;

-- 创建项目/资产表
CREATE TABLE IF NOT EXISTS portfolio (
                                         id INT AUTO_INCREMENT PRIMARY KEY,
                                         name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    value DECIMAL(10, 2) DEFAULT 0,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

-- 插入测试数据
INSERT INTO portfolio (name, type, value, description) VALUES
                                                           ('Apple Inc', 'Stock', 182.50, 'Technology company stock'),
                                                           ('Real Estate', 'Property', 250000.00, 'Residential property'),
                                                           ('Savings Account', 'Cash', 15000.00, 'Emergency fund');
