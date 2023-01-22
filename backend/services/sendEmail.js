const nodemailer = require("nodemailer");

async function sendEmail({ userEmail, userName, userMessage }) {
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "{email}", // generated ethereal user
      pass: "{password}", // generated ethereal password
    },
  });

  let output = `
    <h2>Thank you for sending a message to us</h2>
    <p>The letter came from: ${userName} ${userEmail}</p>
    <p>Here is the message: ${userMessage}</p>
    `;

  let info = await transporter.sendMail({
    from: "{email}", // sender address
    to: "{email}", // list of receivers
    subject: "Conference about space, starts and galaxy", // Subject line
    text: userMessage, // plain text body
    html: output,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;
