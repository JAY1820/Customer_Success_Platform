const nodemailer = require('nodemailer');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email using Nodemailer
const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return { status: 200, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw { status: 500, message: 'Error sending email' };
  }
};

module.exports = { sendEmail };
