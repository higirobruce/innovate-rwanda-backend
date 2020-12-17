import nodemailer from "nodemailer";

export default class Generic {

    static generateSlug(company_name) {
        return company_name.trim().replace(/ /g, "-").toLowerCase();
    }

    static sendEmail(destination, subject, content) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASSWORD
            }
        });
        content = `
            <div style="background:#F0F2F8;width:100%;padding:20px 0;">
                <div style="max-width:400px;margin:0 auto;background:#ffffff">
                    <div style="background:#150D4C1A;padding:10px;color:#ffffff;text-align:center;font-size:34px">
                        <img style="margin: 20px auto;display: block;width: 80px" src='cid:emailTop' alt='Innovate Rwanda'>
                    </div>
                    <div style="padding:20px;text-align:left;">
                        ${content} 
                    </div>
                </div>
                <div style="padding:35px 10px;text-align:center;">
                Copyright, 2020<br>
                Innovate Rwanda
                </div>
            </div>`;

        var mailOptions = {
            from: process.env.MAILER_EMAIL,
            to: destination,
            subject: subject,
            html: content,
            attachments: [{
                filename: "emailTop.png",
                path: "images/emailTop.png",
                cid: "emailTop"
            }]
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
                return error;
            } else {
                console.log("email sent" + info.response)
                return "Email sent: " + info.response;
            }
        });
    }
}