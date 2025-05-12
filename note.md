import nodemailer from "nodemailer"; import Mailgen from "mailgen";

const sendEMail = async (req, res) => { const transporter =
nodemailer.createTransport({ host: "sandbox.smtp.mailtrap.io", port: 587, // try
this instead auth: { user: "c6ff7a0bb74bde", pass: "28f007cae0b18e", }, tls: {
rejectUnauthorized: false }, });

const { emailBody, emailText } = mailGenConfig();

const info = await transporter.sendMail({ from: '"mohib"
<mohibbullahm7@gmail.com>', to: "mohammedhanif74612@gmail.com", subject: "Hello
Mohib", text: emailText, // plain‑text body html: emailBody, // HTML body });

console.log("Message sent:", info.messageId);

res.json(info); };

function mailGenConfig() { const mailGenerator = new Mailgen({ theme: "default",
product: { // Appears in header & footer of e-mails name: "Nike", link:
"https://Nike.com/", // Optional product logo // logo:
'https://mailgen.js/img/logo.png' }, });

const email = { body: { name: "Mohib", intro: "Welcome to Mailgen! We're very
excited to have you on board.", action: { instructions: "To get started with
Mailgen, please click here:", button: { color: "#22BC66", // Optional action
button color text: "Verify your email", link:
"https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010", }, }, outro:
"Need help, or have questions? Just reply to this email, we'd love to help.", },
};

var emailBody = mailGenerator.generate(email);

// Generate the plaintext version of the e-mail (for clients that do not support
HTML) var emailText = mailGenerator.generatePlaintext(email);

return { emailBody, emailText }; }

export { sendEMail };
