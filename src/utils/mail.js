import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';
import { MAIL_PASS, MAIL_PORT, MAIL_SERVICE, MAIL_USER } from '../constant.js';
import ApiError from './apiError.js';

async function sendEmail(options) {

// Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: MAIL_SERVICE,
    port: MAIL_PORT,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const { emailBody, emailText } = mailgenCofig(options.mailFormate);

  try {
    const mail = await transporter.sendMail({
      from: '"Nike" <contact@gmail.com>',
      to: options.email,
      subject: options.subject,
      text: emailText, // plain‑text body
      html: emailBody, // HTML body
    });

    console.log('Message sent:', mail.messageId);
  } catch (error) {
    throw ApiError.serverError(error.message);
  }
}

function mailgenCofig(mailFormate) {
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

  const emailBody = mailGenerator.generate(mailFormate);

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  const emailText = mailGenerator.generatePlaintext(mailFormate);

  return { emailBody, emailText };
}

// mailFormates starts here

const varifyEmailMailFormate = (name, verifyUrl) => {
  return {
    body: {
      name: name,
      intro: `Welcome to nike! We're very excited to have you on board.`,
      action: {
        instructions: 'To get started with nike, please click here:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'verify your email',
          link: verifyUrl,
          // link: 'https://www.youtube.com/',
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const otpVerificationEmailFormat = (name, otp) => {
  return {
    body: {
      name: name,
      intro: "Welcome to Nike! We're excited to have you join us.",
      action: {
        instructions:
          'To verify your account, please use the following One-Time Password (OTP):',
        button: {
          color: '#22BC66',
          text: otp,
          link: null, // No link needed for OTP
        },
      },
      outro:
        "Need help or have questions? Just reply to this email — we're happy to help.",
    },
  };
};

export { sendEmail, varifyEmailMailFormate, otpVerificationEmailFormat };
