const nodemailer = require("nodemailer");
const logger = require("../config/logger");

const sendVerificationEmail = (email, token) => {
  logger.info(`Email is: ${email}`);
  if (!email || !token) {
    console.error("Email or token is missing.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "mail.aitool4all.com", // SMTP host
    port: 465, // Correct port for secure connections
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const verificationUrl = `http://localhost:3000/api/verify-email?token=${token}`;
  const mailOptions = {
    from: `"AITOOL4ALL Support" <${process.env.EMAIL_USERNAME}>`,
    replyTo: `"AITOOL4ALL Support" <${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject: "Verify your email",
    html: `
    <html>
      <body>
        <p>Hello,</p>
        <p>Click the following link to verify your email:</p>
        <p><a href="${verificationUrl}">Verify your email</a></p>
        <br>
        <p>Best regards,</p>
        <p>The AITTOL4ALL Team</p>
        <br>
        <img src="https://aitool4all.com/AIapp/logo.png" alt="AITTOL4ALL Logo" style="width:150px;">
        <br>
        <p>Visit us at <a href="https://aitool4all.com">AITTOL4ALL</a></p>
      </body>
    </html>
  `,
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
