const express = require('express');
require('dotenv').config();
const cors = require("cors");
const emailRoutes = require('./routes/emailRoutes');
const {rateLimit} = require('./middleware/rateLimiter');
const { restrictAccess } = require('./middleware/auth');
const setupSwagger = require('./config/swagger');
const path = require('path');

const app = express();

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
  windowMs: 15 * 60 * 1000,
  maxRequests: 100,
});

app.use(rateLimiterMiddleware);

if (process.env.NODE_ENV === "prod") {
  app.use(restrictAccess);
}

app.use(express.json());

// Swagger setup
setupSwagger(app); 

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
