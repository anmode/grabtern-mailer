const express = require('express');
const sendEmail = require('../src/emailService');
const { restrictAccess} = require('../middleware/auth');

const router = express.Router();

router.post('/dev', async (req, res) => {
  const { recepient, subject, message, useCalendarInvite, calendarObj, useAttachment, imageUrl } = req.body;
  const env = 'dev';

  try {
    const emailResponse = await sendEmail(env ,recepient, subject, message, useCalendarInvite, calendarObj, useAttachment, imageUrl);

    res.status(200).json({ message: "Email sent successfully", response: emailResponse });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});


router.post('/prod', restrictAccess, async (req, res) => {
  const { recepient, subject, message, useCalendarInvite, calendarObj, useAttachment, imageUrl } = req.body;
  const env = 'prod';

  try {
    const emailResponse = await sendEmail(env ,recepient, subject, message, useCalendarInvite, calendarObj, useAttachment, imageUrl);

    res.status(200).json({ message: "Email sent successfully", response: emailResponse });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});



module.exports = router;
