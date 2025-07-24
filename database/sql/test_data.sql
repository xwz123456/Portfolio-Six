-- Insert test data into the users table
INSERT INTO users (username, created_at) VALUES
('user1', NOW()),
('user2', NOW()),
('user3', NOW());

-- Insert test data into the user_assets table
INSERT INTO user_assets (user_id, asset_type, asset_code, asset_name, quantity, purchase_price, current_price, purchase_date) VALUES
(1, 'stock', 'AAPL', 'Apple Inc.', 10, 150.00, 155.00, '2023-01-01'), -- Stock example
(1, 'crypto', 'BTC123', 'Bitcoin', 0.5, 20000.00, 25000.00, '2023-02-01'), -- Crypto example
(2, 'fund', 'FND123', 'Growth Fund', 100, 50.00, 52.00, '2023-03-01'), -- Fund example
(3, 'bond', 'BND456', 'Corporate Bond', 200, 100.00, 101.00, '2023-04-01'); -- Bond example

-- Insert test data into the total_profit_history table
INSERT INTO total_profit_history (user_id, record_date, total_assets, total_profit) VALUES
(1, '2023-05-01', 16000.00, 1000.00),
(1, '2023-06-01', 16500.00, 1500.00),
(2, '2023-05-01', 5200.00, 200.00),
(3, '2023-05-01', 20200.00, 200.00);
