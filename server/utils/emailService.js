const nodemailer = require("nodemailer");

const sendVerificationEmail = (email, token) => {
  if (process.env.NODE_ENV === "development") {
    console.log(
      `Verification link: http://localhost:5000/verify-email?token=${token}`
    );
  } else {
    // Production logic: Send email using nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      text: `Click the following link to verify your email: https://aitool4all.com/verify-email?token=${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  }
};

module.exports = { sendVerificationEmail };
