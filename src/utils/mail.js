import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';
import { MAIL_PASS, MAIL_PORT, MAIL_SERVICE, MAIL_USER } from '../constant.js';
import ApiError from './apiError.js';

async function sendEmail(options) {
  console.log('hello! i am from mail.js file');
  console.log(options);

  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'olaf.hagenes78@ethereal.email',
      pass: 'yT6StAPVZaW8sbbVSq',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailFormat = {
    body: {
      name: options.name,
      intro: `Welcome to nike! We're very excited to have you on board.`,
      action: {
        instructions: 'To get started with nike, please click here:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'verify your email',
          link: options.verifyUrl,
          // link: 'https://www.youtube.com/',
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const { emailBody, emailText } = mailgenCofig(mailFormat);

  // Wrap in an async IIFE so we can use await.
  try {
    const mail = await transporter.sendMail({
      from: '"Nike" <contact@gmail.com>',
      to: options.email,
      subject: 'Hello Mohammed',
      text: emailText, // plain‑text body
      html: emailBody, // HTML body
    });

    console.log('Message sent:', mail.messageId);
  } catch (error) {
    throw ApiError.serverError(error.message);
  }
}

function mailgenCofig(mailFormat) {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      // Appears in header & footer of e-mails
      name: 'Nike',
      link: 'https://nke.com/',
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
    },
  });

  const emailBody = mailGenerator.generate(mailFormat);

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  const emailText = mailGenerator.generatePlaintext(mailFormat);

  return { emailBody, emailText };
}

export default sendEmail;
