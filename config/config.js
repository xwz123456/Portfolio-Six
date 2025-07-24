require('dotenv').config(); // Load environment variables from .env

const env = process.env.NODE_ENV || 'dev'; // Default to 'dev'

const configs = {
    dev: {
        port: process.env.PORT || 3000,
        db: {
            host: process.env.DB_HOST ,
            user: process.env.DB_USER ,
            password: process.env.DB_PASSWORD ,
            database: process.env.DB_NAME
        }
    },
    prod: {
        port: process.env.PORT || 8000,
        db: {
            host: process.env.DB_HOST ,
            user: process.env.DB_USER ,
            password: process.env.DB_PASSWORD ,
            database: process.env.DB_NAME 
        }
    }
};

module.exports = configs[env];
