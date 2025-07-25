const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config'); // Update path to configuration
const assetRoutes = require('./routes/assetRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Add logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Log the current environment
console.log(`Running in ${process.env.NODE_ENV} mode`);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Portfolio Management API');
});

// Routes
app.use('/api/assets', assetRoutes); // Ensure asset routes are included

// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start the server
const PORT = config.port || 5000; // Use port from config
app.listen(PORT, () => {
    console.log(`Financial Portfolio Backend Server is running on port ${PORT}`);
});
