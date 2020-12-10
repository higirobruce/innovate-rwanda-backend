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
        content = "<img align='right' src='cid:emailTop' alt='Innovate Rwanda'><br><br><br><br><br><br>" +
                  content +
                  "<br><br>Regards,<br>Innovate Rwanda Team";

        var mailOptions = {
            from: process.env.MAILER_EMAIL,
            to: destination,
            subject: subject,
            html: content,
            attachments: [{
                filename: 'emailTop.png',
                path: 'images/emailTop.png',
                cid: 'emailTop'
            }]
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
                return error;
            } else {
                console.log("email sent"+ info.response)
                return 'Email sent: ' + info.response;
            }
        });
    }
}