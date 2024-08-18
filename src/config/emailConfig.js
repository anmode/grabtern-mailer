require('dotenv').config();

const emailConfig = {
  dev: {
    smtpHost: process.env.DEV_SMTP_HOST,
    smtpPort: parseInt(process.env.DEV_SMTP_PORT, 10),
    smtpSecure: process.env.DEV_SMTP_SECURE === 'true',
    auth: {
      user: process.env.DEV_SMTP_USER,
      pass: process.env.DEV_SMTP_PASS,
    },
  },
  test: {
    smtpHost: process.env.TEST_SMTP_HOST,
    smtpPort: parseInt(process.env.TEST_SMTP_PORT, 10),
    smtpSecure: process.env.TEST_SMTP_SECURE === 'true',
    auth: {
      user: process.env.TEST_SMTP_USER,
      pass: process.env.TEST_SMTP_PASS,
    },
  },
  prod: {
    smtpHost: process.env.PROD_SMTP_HOST,
    smtpPort: parseInt(process.env.PROD_SMTP_PORT, 10),
    smtpSecure: process.env.PROD_SMTP_SECURE === 'true',
    auth: {
      type: process.env.PROD_AUTH_TYPE,
      user: process.env.PROD_SMTP_USER,
      clientId: process.env.PROD_CLIENT_ID,
      clientSecret: process.env.PROD_CLIENT_SECRET,
      refreshToken: process.env.PROD_REFRESH_TOKEN,
      accessToken: process.env.PROD_ACCESS_TOKEN,
    },
  },
};

const emailCurrentEnv = process.env.NODE_ENV || 'dev';

// Export the corresponding configuration based on the environment
module.exports = emailConfig[emailCurrentEnv];
