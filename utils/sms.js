import config from "config";
import Twilio from "twilio";
import register from "../register.js";


let { SID, TOKEN, NUMBER } = config.get("SEND_SMS");

const client = new Twilio(SID, TOKEN);
export default async function sendSMS(smsData) {
  try {
    await client.messages.create({
      body: smsData.body,
      to: smsData.phonenumber,
      from: NUMBER,
    });
  } catch (error) {
    console.log(error);
  }
}


