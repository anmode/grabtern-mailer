const express = require('express');
require('dotenv').config();
const cors = require("cors");
const emailRoutes = require('./routes/emailRoutes');
const app = express();

// Set up CORS middleware with different options based on NODE_ENV
let corsOptions = {
  origin: ".grabtern.in",
  credentials: true,
};

if (process.env.NODE_ENV === "test") {
  corsOptions.origin = [/localhost(:\d+)?$/, /\.grabtern\.in$/];
} else if (process.env.NODE_ENV === "prod") {
  corsOptions.origin = /\.grabtern\.in$/;
} else if (process.env.NODE_ENV === "dev") {
  corsOptions.origin = [/localhost(:\d+)?$/];
}

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
