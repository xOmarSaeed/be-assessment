const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');
const config = require('config');

exports.sendVerificationMail = (user, verificationCodeLifeTime) => {
  const transporter = nodemailer.createTransport({
    service: config.get('mail.service'),
    auth: {
      user: config.get('mail.username'),
      pass: config.get('mail.password'),
    },
  });

  const source = fs.readFileSync(path.join(__dirname, './Templates/confirmEmail.handlebars'), 'utf8');
  const compiledTemplate = handlebars.compile(source);

  const content = {
    from: config.get('mail.username'),
    to: user.email,
    subject: '[Bosta 📦]: Verification Code',
    // text: `You can verify your account using the code: ${user.verificationCode}`,
    html: compiledTemplate({
      verificationCode: user.verificationCode,
      verificationCodeLifeTime,
    }),
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(content, (err, info) => {
      if (err) {
        console.log('error: ', err);
        reject(err);
      } else {
        console.log('Mail sent successfully!');
        resolve(info);
      }
    });
  });
};
