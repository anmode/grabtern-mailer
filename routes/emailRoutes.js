const express = require('express');
const sendEmail = require('../src/emailService');
const {restrictAccess} = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /send-mail/dev:
 *   post:
 *     summary: Send an email (Development environment)
 *     description: Sends an email using the specified parameters in the development environment.
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipient:
 *                 type: string
 *                 description: The email address of the recipient.
 *                 example: "example@domain.com"
 *               subject:
 *                 type: string
 *                 description: The subject of the email.
 *                 example: "Test Email"
 *               message:
 *                 type: string
 *                 description: The body of the email message.
 *                 example: "This is a test email."
 *               useCalendarInvite:
 *                 type: boolean
 *                 description: Whether to include a calendar invite.
 *                 example: false
 *               calendarObj:
 *                 type: object
 *                 description: The calendar invite details if `useCalendarInvite` is true.
 *               useAttachment:
 *                 type: boolean
 *                 description: Whether to include an attachment.
 *                 example: false
 *               imageUrl:
 *                 type: string
 *                 description: The URL of the image to include in the email.
 *                 example: "http://example.com/image.png"
 *     responses:
 *       200:
 *         description: Email sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email sent successfully"
 *                 response:
 *                   type: object
 *                   description: The response from the email service.
 *       500:
 *         description: Failed to send email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to send email"
 *                 error:
 *                   type: string
 *                   description: The error message.
 */
router.post('/dev', async (req, res) => {
  const { recipient, subject, message, useCalendarInvite, calendarObj, useAttachment, imageUrl } = req.body;
  const env = 'dev';

  try {
    const emailResponse = await sendEmail(env, recipient, subject, message, useCalendarInvite, calendarObj, useAttachment, imageUrl);

    res.status(200).json({ message: "Email sent successfully", response: emailResponse });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

router.post('/prod', restrictAccess , async (req, res) => {
  const { recepient, subject, message, useCalendarInvite, calendarObj, useAttachment, imageUrl } = req.body;
  console.log(req.body);
  const env = 'prod';

  try {
    const emailResponse = await sendEmail(env, recepient, subject, message, useCalendarInvite, calendarObj, useAttachment, imageUrl);

    res.status(200).json({ message: "Email sent successfully", response: emailResponse });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

module.exports = router;
