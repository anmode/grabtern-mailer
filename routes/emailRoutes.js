const express = require('express');
const sendEmail = require('../src/emailService');

const router = express.Router();

router.post('/', async (req, res) => {
  const { recepient, subject, message, useCalendarInvite, calendarObj, useAttachment, imageUrl } = req.body;
  console.log(recepient, message, subject, calendarObj);

  try {
    const emailResponse = await sendEmail(recepient, subject, message, useCalendarInvite, calendarObj, useAttachment, imageUrl);
    res.status(200).json({ message: "Email sent successfully", response: emailResponse });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

module.exports = router;
