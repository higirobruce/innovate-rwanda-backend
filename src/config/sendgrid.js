import 'dotenv/config';
import Mail from '@sendgrid/mail';

const { SENDGRID_API_KEY } = process.env;

Mail.setApiKey(SENDGRID_API_KEY);

const sendEmail = (msg) => {
  const msgPayload = {
    to: msg.to || 'eliemugenzi@gmail.com',
    bcc: msg.bcc || undefined,
    cc: msg.cc || undefined,
    from: msg.from || 'Innovate Rwanda <noreply@innovaterwanda.com>',
    subject: msg.subject || 'Innovate Rwanda',
    text: msg.html || '<strong>Innovate Rwanda</strong>'
  };

  return Mail.send(msgPayload);
};

export default sendEmail;
