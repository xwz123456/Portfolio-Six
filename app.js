const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');
const assetRoutes = require('./routes/assetRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig');

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

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/assets', assetRoutes);

//// Global error-handling middleware
//app.use((err, req, res) => {
//  console.error(err.stack);
//  res
//    .status(err.status || 500)
//    .json({ error: err.message || 'Internal Server Error' });
//});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Financial Portfolio Backend Server is running on port ${PORT}`);
  console.log(`Server at http://localhost:${PORT}`);
});
