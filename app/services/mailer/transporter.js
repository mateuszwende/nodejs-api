const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
  host: 'poczta.o2.pl',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  port: 465,
  secure: false, // use SSL
  tls: {
    rejectUnauthorized: false,
  },
});
