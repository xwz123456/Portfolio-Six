const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Portfolio Management API',
            version: '1.0.0',
            description: 'API documentation for the Portfolio Management project',
        },
        servers: [
            {
                url: 'http://localhost:5000', 
            },
        ],
    },
    apis: ['./routes/*.js', './controllers/*.js'], // Ensure these paths are correct
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;