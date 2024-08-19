const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const getEmailConfig = require("../config/emailConfig");

module.exports = async function sendEmail(
  env,
  recepient,
  subject,
  message,
  useCalendarInvite = false,
  calendarObj = null,
  useAttachment = false,
  imageUrl = null,
) {
  try {
    const emailConfig = getEmailConfig(env);

    console.log(emailConfig);

    let transporter;

    if (emailConfig.auth.type === "OAuth2") {
      const oauth2Client = new OAuth2(
        emailConfig.auth.clientId,
        emailConfig.auth.clientSecret,
        "https://developers.google.com/oauthplayground",
      );

      oauth2Client.setCredentials({
        refresh_token: emailConfig.auth.refreshToken,
      });

      const accessToken = await oauth2Client.getAccessToken();

      if (!accessToken.token) {
        throw new Error("Failed to retrieve access token");
      }

      transporter = nodemailer.createTransport({
        host: emailConfig.smtpHost,
        port: emailConfig.smtpPort,
        secure: emailConfig.smtpSecure,
        auth: {
          type: "OAuth2",
          user: emailConfig.auth.user,
          clientId: emailConfig.auth.clientId,
          clientSecret: emailConfig.auth.clientSecret,
          refreshToken: emailConfig.auth.refreshToken,
          accessToken: accessToken.token,
        },
      });
    } else {
      transporter = nodemailer.createTransport({
        host: emailConfig.smtpHost,
        port: emailConfig.smtpPort,
        secure: emailConfig.smtpSecure,
        auth: {
          user: emailConfig.auth.user,
          pass: emailConfig.auth.pass,
        },
      });
    }

    // Read the email template files and other resources
    const templatesPath = path.join(__dirname, "templates");
    const header = fs.readFileSync(path.join(templatesPath, "header.html"), "utf8");
    const footer = fs.readFileSync(path.join(templatesPath, "footer.html"), "utf8");
    const logo = fs.readFileSync(path.join(templatesPath, "logo.png"), { encoding: "base64" });

    // Create the HTML email
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
    
        .email-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
        }
    
        .header-content {
          background-color: #845ec2;
          color: white;
          padding: 20px;
          text-align: center;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
    
        .content {
          margin: 20px 0;
          line-height: 1.5;
        }
    
        .footer-content {
          background-color: #6c757d;
          color: white;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
    
        .logo {
          width: 150px;
          height: auto;
        }
    
        @media only screen and (max-width: 600px) {
          .email-container {
            border-radius: 0;
          }
          .header-content, .footer-content {
            border-radius: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header-content">
          <h1>${subject}</h1>
        </div>
        <div class="content">
          ${message}
        </div>
        <div class="footer-content">
          <p>Thank you for being a valued member of our community.</p>
          <p>&copy; 2023 Our Company. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Prepare the email options
    const mailOptions = {
      from: emailConfig.auth.user,
      to: recepient,
      subject: subject,
      html: html,
    };

    if (useAttachment) {
      mailOptions.attachments = [{ path: imageUrl }];
    }

    if (useCalendarInvite) {
      mailOptions.icalEvent = {
        filename: "invitation.ics",
        method: "request",
        content: calendarObj.toString(),
      };
    }

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error in sending email:", error);
    throw error;
  }
};
