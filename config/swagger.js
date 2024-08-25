// swaggerSetup.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Grabtern Email Service API',
    version: '1.0.0',
    description: 'API documentation for the Grabtern Email Service',
  },
  servers: [
    {
      url: process.env.NODE_ENV === 'dev' ? 'http://localhost:3000' : 'https://demomailer.grabtern.in',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
