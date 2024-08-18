const express = require('express');
const sendEmail = require('../service/emailService');

const router = express.Router();

router.post('/', async (req, res) => {
  const { recipient, subject, message, useAttachment, imageUrl, useCalendarInvite, calendarObj } = req.body;
  console.log( recipient, subject, message);

  try {
    await sendEmail(recipient, subject, message, useCalendarInvite, calendarObj, useAttachment, imageUrl);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

module.exports = router;
