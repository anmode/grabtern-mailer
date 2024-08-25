// app.js
const express = require('express');
require('dotenv').config();
const cors = require("cors");
const path = require('path');
const emailRoutes = require('./routes/emailRoutes');
const { rateLimit } = require('./middleware/rateLimiter');
const { restrictAccess } = require('./middleware/auth');
const swaggerSpec = require('./config/swagger');

const app = express();

// CORS setup based on environment
let corsOptions;

if (process.env.NODE_ENV === "test") {
  corsOptions = {
    origin: [/localhost(:\d+)?$/, /\.grabtern\.in$/],
    credentials: true,
  };
} else if (process.env.NODE_ENV === "prod") {
  corsOptions = {
    origin: /\.grabtern\.in$/,
    credentials: true,
  };
} else if (process.env.NODE_ENV === "dev") {
  corsOptions = {
    origin: [/localhost(:\d+)?$/],
    credentials: true,
  };
} else {
  corsOptions = {
    origin: "*",
  };
}

app.use(cors(corsOptions));

// Rate limiting middleware
const rateLimiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
});

app.use(rateLimiterMiddleware);

if (process.env.NODE_ENV === "prod") {
  app.use(restrictAccess);
}

app.use(express.json());

// Serve Swagger UI from static files in the public folder
app.use('/api-docs', express.static(path.join(__dirname, 'public/dist')));
app.get('/api-docs/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

// Serve static files from the "public" directory
app.use('/static', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/send-mail', emailRoutes);

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Grabtern Email Service</title>
      </head>
      <body>
        <h1>Welcome to Grabtern Email Service API</h1>
        <img src="/static/grab-logo.png" alt="Grabtern Logo">
      </body>
    </html>
  `);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Email service running on port ${port}`);
});
