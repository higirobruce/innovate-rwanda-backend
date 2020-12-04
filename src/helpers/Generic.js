import nodemailer from "nodemailer";

export default class Generic {

    static generateSlug(company_name) {
        return company_name.trim().replace(/ /g, "-").toLowerCase();
    }

    static sendEmail(destination, subject, content) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_PASSWORD
          }
        });
        console.log(destination);
        console.log(subject);
        console.log(content);
    
        var mailOptions = {
          from: process.env.MAILER_EMAIL,
          to: destination,
          subject: subject,
          text: content
        };
      
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            return error;
          } else {
            return 'Email sent: ' + info.response;
          }
        });
      }
}