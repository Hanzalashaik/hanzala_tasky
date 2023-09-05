import nodemailer from "nodemailer";
import config from "config";


let { HOST, AUTH, PORT } = config.get("EMAIL_SMTP");

let clientvalidate = nodemailer.createTransport({
  host: HOST,
  port: PORT,
  secure: true,
  auth: {
    user: AUTH.USER,
    pass: AUTH.PASS,
  },
});

export default async function send_EMAIL(emailData) {
  try {
    // send mail with defined transport object
    const info = await clientvalidate.sendMail({
      from: `HANZALA'S TASKY <${AUTH.USER}>`, // sender address
      to: emailData.to, // list of receivers
      subject: emailData.subject, // Subject line
      text: emailData.text, // plain text body
    //   html: "<b>HTML?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {}
}

// send_EMAIL({
//     subject:"this text subject",
//     text:"text",
//     to:"shaikhhanzala27@gmail.com"
// })
