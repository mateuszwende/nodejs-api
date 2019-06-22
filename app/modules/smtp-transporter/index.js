const nodemailer = require('nodemailer');

const smtpConfig = {
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  port: process.env.SMTP_PORT,
  secure: true,
};

const transporter = nodemailer.createTransport(smtpConfig);

module.exports = {
  sendVerificationTokenEmail: (email, token) => {
    const verificationUrl = `${process.env.URL + process.env.SMTP_ROUTE}/${token}`;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Verify your account',
      html: `<h4>Welcome on the board!</h4> Please verify your email by clicking this link: ${verificationUrl}`,
    };

    return new Promise((res, rej) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          rej(err);
        }

        res(info);
      });
    });
  },
};
