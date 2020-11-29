import nodemailer from "nodemailer";

export default class Mailer {

  static sendEmail(destination, subject, content) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD
      }
    });

    var mailOptions = {
      from: process.env.MAILER_EMAIL,
      to: destination,
      subject: subject,
      text: content
    };
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}