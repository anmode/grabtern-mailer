const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const url = process.env.NODE_ENV === 'prod' ? 'https://demomailer.grabtern.in' : 'http://localhost:3000'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Grabtern Email Service API',
    version: '1.0.0',
    description: 'API documentation for the Grabtern Email Service',
  },
  servers: [
    {
      url: url,
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
