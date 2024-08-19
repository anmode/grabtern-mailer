const express = require('express');
require('dotenv').config();
const emailRoutes = require('./routes/emailRoutes');
const app = express();

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
