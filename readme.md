
# Grabtern Email Service API

![Grabtern Logo](https://yourlogo.com/logo.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Setup Development Environment](#setup-development-environment)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Production Environment](#production-environment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

The **Grabtern Email Service API** is a dedicated microservice within the Grabtern ecosystem, designed to handle email communication needs. It supports sending emails with attachments, calendar invites, and other customizable options, making it a versatile tool for both development and production environments.

## Features

- Send emails with customizable options.
- Environment-specific SMTP configurations (development, testing, production).
- Rate limiting to prevent abuse.
- Authentication middleware for secure email sending in production.
- API documentation with Swagger.

## Technology Stack

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for Node.js.
- **Nodemailer**: Node.js module for sending emails.
- **Swagger**: API documentation.
- **dotenv**: Environment variable management.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development machine:

- **Node.js** (v14.x or later)
- **npm** (v6.x or later)
- **Git** (optional, for cloning the repository)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/grabtern/grabtern-email-service.git
   cd grabtern-email-service
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### Setup Development Environment

1. **Run the setup script** to generate the `.env` file with the necessary environment variables:

   ```bash
   ./setup-dev-env.sh
   ```

   This will create a `.env` file with default development and test configurations.

2. **Verify the `.env` file**: Ensure the environment variables are correctly set. The setup script will create the following default `.env` file:

   ```plaintext
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
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```

   The API will be available at `http://localhost:3000`.

## Usage

### Sending an Email

To send an email in the development environment, make a POST request to:

```
POST http://localhost:3000/send-mail/dev
```

With the following JSON payload:

```json
{
  "recepient": "example@domain.com",
  "subject": "Test Email",
  "message": "This is a test email.",
  "useCalendarInvite": false,
  "useAttachment": false,
  "imageUrl": "http://example.com/image.png"
}
```

### API Documentation

Swagger documentation is available for the API. After starting the server, you can access the documentation at:

```
http://localhost:3000/api-docs 
```
or

```
http://demomailer.grabtern.in/api-docs 
```

## Production Environment

The production environment of this email service is hosted at:

```
https://demomailer.grabtern.in
```

Please note that this service implements rate limiting to prevent abuse. **Do not attempt to perform a DDoS attack** or flood the service with requests, as this will result in your IP being blocked.

## Contributing

We welcome contributions from the community! To get started, please follow these steps:

1. **Fork the repository**.

2. **Create a new branch** for your feature or bugfix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit your changes**:

   ```bash
   git commit -m "Add some feature"
   ```

4. **Push to the branch**:

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**.

Please make sure to update tests as appropriate, and ensure your code follows the existing style conventions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact:

- **Email**:contact.grabtern@gmail.com
