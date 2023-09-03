import config from "config";
import Twilio from "twilio";

function randomNumber() {
  let count = 5;
  let ran = 0;
  for (let i = 1; i <= count; i++) {
    ran = ran * 10 + Math.floor(Math.random() * 10);
  }
  return ran;
}
let otp = randomNumber();

let { SID, TOKEN, NUMBER } = config.set("SEND_SMS");

const client = new Twilio(SID, TOKEN);
async function sendSMS() {
  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      to: "",
      from: NUMBER,
    });
  } catch (error) {
    console.log(error);
  }
}
sendSMS();
