import dotenv from 'dotenv';
dotenv.config();
const nodemailer = require('nodemailer');

const sendMail = (email, message) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Update with your email service
    auth: {
      user: process.env.USER_ID, // Update with your email address
      pass: process.env.PASSWORD // Update with your email password
    }
  });

  const sendMailconfig = {
    from: process.env.USER_ID,
    to: email,
    subject: 'Welcome to Our App',
    text: message
  };

  transporter.sendMail(sendMailconfig, (error, info) => {
    if (error) {
      return `Error sending email ${error}`;
    } else {
      return `Email sent ${info.response}`;
    }
  });
};

export default sendMail;
