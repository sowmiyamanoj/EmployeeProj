const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

function sendEmail({ firstName, lastName, email, message, phonenumber }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "guptaram2698@gmail.com",
        pass: "mdtshmhawlsivnti",
      },
    });

    const mail_configs = {
      from: "guptaram2698@gmail.com",
      to: "keerthivasan3105@gmail.com",
      subject: "New Message from ContactForm",
      html: `
      <p>Dear Thay Technologyies,</p>
      <p>You have received a new message from:</p>
      <p><strong>Name:<strong> ${firstName} ${lastName}</p>
      <p><strong>Email:<strong> ${email}</p>
      <p><strong>phonenumber:<strong> ${phonenumber}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <br />
      <p>Best Regards,</p>
      <p>Team thaytechnology</p>
      `,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}

module.exports = sendEmail;