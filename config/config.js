require('dotenv').config(); // Load environment variables from .env

const env = process.env.NODE_ENV || 'dev'; // Default to 'dev'

const configs = {
  dev: {
    port: process.env.PORT || 3000,
    db: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'financial_portfolio',
    },
  },
  prod: {
    port: process.env.PORT || 8000,
    db: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'portfolio_management_prod',
    },
  },
};

module.exports = configs[env];
