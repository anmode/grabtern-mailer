#!/bin/bash

# Check if .env file already exists
if [ -f ".env" ]; then
  echo ".env file already exists."
  exit 1
fi

# Create .env file with the following content
cat <<EOL > .env
NODE_ENV=dev
EMAIL_SERVICE_SECRET=idk

# Development Environment
DEV_SMTP_HOST=smtp.ethereal.email
DEV_SMTP_PORT=587
DEV_SMTP_SECURE=false
DEV_SMTP_USER=dexter.waelchi@ethereal.email
DEV_SMTP_PASS=MjMfuHFxfjeXttjH8v

# Test Environment
TEST_SMTP_HOST=smtp.ethereal.email
TEST_SMTP_PORT=587
TEST_SMTP_SECURE=false
TEST_SMTP_USER=dexter.waelchi@ethereal.email
TEST_SMTP_PASS=MjMfuHFxfjeXttjH8v
EOL

echo ".env file has been created with development environment variables."
