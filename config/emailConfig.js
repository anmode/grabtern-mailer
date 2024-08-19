require('dotenv').config();

const emailConfig = {
  dev: {
    smtpHost: process.env.DEV_SMTP_HOST || 'smtp.example.com',
    smtpPort: parseInt(process.env.DEV_SMTP_PORT, 10) || 587,
    smtpSecure: process.env.DEV_SMTP_SECURE === 'true',
    auth: {
      user: process.env.DEV_SMTP_USER || 'user@example.com',
      pass: process.env.DEV_SMTP_PASS || 'password',
    },
  },
  test: {
    smtpHost: process.env.TEST_SMTP_HOST || 'smtp.example.com',
    smtpPort: parseInt(process.env.TEST_SMTP_PORT, 10) || 587,
    smtpSecure: process.env.TEST_SMTP_SECURE === 'true',
    auth: {
      user: process.env.TEST_SMTP_USER || 'user@example.com',
      pass: process.env.TEST_SMTP_PASS || 'password',
    },
  },
  prod: {
    smtpHost: process.env.PROD_SMTP_HOST || 'smtp.example.com',
    smtpPort: parseInt(process.env.PROD_SMTP_PORT, 10) || 587,
    smtpSecure: process.env.PROD_SMTP_SECURE === 'true',
    auth: {
      type: process.env.PROD_AUTH_TYPE || 'OAuth2',
      user: process.env.PROD_SMTP_USER || 'user@example.com',
      clientId: process.env.PROD_CLIENT_ID || 'clientId',
      clientSecret: process.env.PROD_CLIENT_SECRET || 'clientSecret',
      refreshToken: process.env.PROD_REFRESH_TOKEN || 'refreshToken',
      accessToken: process.env.PROD_ACCESS_TOKEN || 'accessToken',
    },
  },
};

// Export a function to get the configuration based on the environment
module.exports = (env) => emailConfig[env] || emailConfig.dev;
