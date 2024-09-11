const nodemailer = require('nodemailer');
const logger = require('../config/logger');

const sendVerificationEmail = (email, token) => {
  logger.info(`Email is: ${email}`);
  if (!email || !token) {
    console.error("Email or token is missing.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "mail.aitool4all.com", // SMTP host
    port: 465,                  // Correct port for secure connections
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const verificationUrl = `https://aitool4all.com/verify-email?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Verify your email",
    text: `Click the following link to verify your email: ${verificationUrl}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending verification email:", error);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

const sendResetPasswordEmail = (email, token) => {
  if (!email || !token) {
    console.error("Email or token is missing.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "mail.aitool4all.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Password Reset Request",
    text: `Click the following link to reset your password: ${resetUrl}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending reset password email:", error);
    } else {
      console.log("Reset password email sent:", info.response);
    }
  });
};

module.exports = { sendVerificationEmail, sendResetPasswordEmail };