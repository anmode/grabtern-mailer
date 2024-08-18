const express = require('express');
require('dotenv').config();
const emailRoutes = require('./routes/emailRoutes');
const cors = require('cors');
const app = express();

// Middleware to restrict API requests in production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'prod') {
    const allowedDomain = '.grabtern.in';
    const host = req.get('Host') || '';
    if (!host.endsWith(allowedDomain)) {
      return res.status(403).send('Forbidden: Access is restricted to .grabtern.in');
    }
  }
  next();
});

// CORS options
const corsOptions = {
  origin: process.env.NODE_ENV === 'prod' ? /\.grabtern\.in$/ : '*',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/send-mail', emailRoutes);

app.get('/', (req, res) => {
  res.send("Welcome to Grabtern Email Service!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Email service running on port ${port}`);
});
