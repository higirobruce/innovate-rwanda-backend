
import nodemailer from "nodemailer";
const Mail = require('./Mail.js');
const generic = require('./Generic.js');
import NotificationController from "../controllers/NotificationController";
const logger = require('./LoggerMod.js');

export default class Notification {
    static async notify(notification_type, parameters, callback) {
        try {
            var mail = new Array(), response, send = true, notifCo = false;

            if (notification_type == "registration") {
                mail[0] = Mail.accountRegistration(parameters);
                response = "An email is sent to your email, Check your email to activate your account.";
            } else if (notification_type == "account activation") {
                mail[0] = Mail.accountActivation(parameters);
                response = "Account Activated. A confirmation is sent to your email";
            } else if (notification_type == "account activation link resubmission") {
                mail[0] = Mail.accountRegistration(parameters);
                response = "Account activation link is resent to the user's email.";
            } else if (notification_type == "first login") {
                send = false;
                notifCo = true;
                mail[0] = Mail.firstLogin(parameters);
            } else if (notification_type == "admin account creation") {
                mail[0] = Mail.adminAccountCreation(parameters);
                response = "Email sent to Admin. ";
            } else if (notification_type == "forgot password") {
                mail[0] = Mail.forgotPassword(parameters);
                response = "Email is sent, Check your email for the link";
            } else if (notification_type == "subscribe") {
                mail[0] = Mail.subscription(parameters);
                response = parameters.email + " subscribed";
            } else if (notification_type == "message post") {
                mail = await Mail.messagePost(parameters);
                response = "Message Sent";
            } else if (notification_type == "post approval") {
                notifCo = true;
                mail[0] = await Mail.postApproval(parameters)
                response = "Post Approved, Emails sent to those in related activities and subscribers";
            } else if (notification_type === "delete own company") {
                mail[0] = await Mail.deleteCompanyByOwner(parameters)
                response = "Company deleted successfully, a confirmation email just got sent to you about that";
            } else if (notification_type == "company approval") {
                mail[0] = await Mail.companyApproval(parameters);
                response = "Message Sent";
            }

            if (notifCo == true) {
                await NotificationController.notificationPost(mail);
            }

            if (send == true && mail && mail.length > 0) {
                for (var i = 0; i < mail.length; i++) {
                    if (mail[i] && mail[i].destination) {
                        Notification.sendEmail(mail[i], function (resp) {                        
                            if (resp == -1 || resp == 0) {
                               
                                callback("Approved but an error accurred on email sending")
                            } else if (resp == 1 && i == mail.length) {
                                callback(response)
                            }
                        });
                    } else {
                        callback("Approved. No email to send to found though, no email sent");
                    }
                }
            } else {
                callback("Approved. No email to send found though, no email sent");
            }
        } catch (error) {
            logger.customLogger.log('error', error)
            callback(-2)
        }
    }

    static sendEmail(mail, callback) {
        try {
            var content, mailOptions;
            const footer = `Copyright, ${generic.getYear()}<br>Innovate Rwanda`;
            const unsubscribe = `<a href="${process.env.APP_URL}/unsubscribe">unsubscribe</a>`;
               
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.MAILER_EMAIL,
                    pass: process.env.MAILER_PASSWORD
                }
            });

            switch (mail.format) {
                case "Event":
                case "Blog":
                    content = `<div style="background:#F0F2F8;width:100%;">
                                    <div style="margin: 20px auto;text-align:left;padding:35px 10px 35px 12%;background:#150D4C1A;font-size:34px">
                                        <b>Innovate Rwanda </b> New ${mail.format} Published
                                    </div>
                                    <div style="padding:3%;text-align:left;font-size:34px">
                                        <img style="margin: 20px auto;display: block;" src='cid:post-image' alt='Innovate Rwanda, Post image'>
                                    </div>
                                    <div style="margin: 20px;text-align:left;padding-left:10%;padding-right:10%">
                                        <div style="font-size:28px">
                                            <b>${mail.title}</b>
                                        </div>
                                        <div>${mail.content} ${mail.readMoreLink}</div>
                                    </div>
                                    <div style="padding:35px 10px;text-align:center;background:#150D4C1A;">
                                        ${footer} <br><br> ${unsubscribe}
                                    </div>
                                </div>`;
                    mailOptions = {
                        from: process.env.MAILER_EMAIL,
                        bcc: mail.destination,
                        subject: mail.subject,
                        html: content,
                        attachments: [{
                            filename: "post.jpg",
                            path: `${process.env.PATH_FILES}${mail.file_name}`,
                            cid: "post-image"
                        }]
                    };
                    break;
                case "Job":
                    content = `<div style="background:#F0F2F8;width:100%;">
                                    <div style="margin: 20px auto;text-align:left;padding:35px 10px 35px 12%;background:#150D4C1A;font-size:34px">
                                        <b>Innovate Rwanda </b> New ${mail.format} Published
                                    </div>
                                    <div style="margin: 20px;text-align:left;padding-left:10%;padding-right:10%">
                                        <div style="font-size:28px">
                                            <b>${mail.title}</b>
                                        </div>
                                        <div>${mail.content} ${mail.readMoreLink}</div>
                                    </div>
                                    <div style="padding:35px 10px;text-align:center;background:#150D4C1A;">
                                        ${footer} <br><br> ${unsubscribe}
                                    </div>
                                </div>`;
                    mailOptions = {
                        from: process.env.MAILER_EMAIL,
                        bcc: mail.destination,
                        subject: mail.subject,
                        html: content
                    };
                    break;
                default:
                    content = `<div style="background:#F0F2F8;width:100%;padding:20px 0;">
                                    <div style="max-width:400px;margin:0 auto;background:#ffffff">
                                        <div style="background:#150D4C1A;padding:10px;color:#ffffff;text-align:center;font-size:34px">
                                            <img style="margin: 20px auto;display: block;width: 80px" src='cid:emailTop' alt='Innovate Rwanda'>
                                        </div>
                                        <div style="padding:20px;text-align:left;">
                                            ${mail.content} 
                                        </div>
                                    </div>
                                    <div style="padding:35px 10px;text-align:center;">${footer}</div>
                                </div>`;
                    mailOptions = {
                        from: process.env.MAILER_EMAIL,
                        to: mail.destination,
                        subject: mail.subject,
                        html: content,
                        attachments: [{
                            filename: "emailTop.png",
                            path: "images/emailTop.png",
                            cid: "emailTop"
                        }]
                    };
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                    callback(0)
                } else {
                    console.log("email sent" + info.response)
                    callback(1);
                }
            });
        } catch (error) {
            logger.customLogger.log('error', error)
            //console.log(error)
            return callback(-1);
        }
    }
}