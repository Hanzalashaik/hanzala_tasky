import readline from "readline-sync";
import fs from "fs/promises";
import color from "cli-color";
import loading from "loading-cli";
import main from "./app.js";

import config from "config";
import Twilio from "twilio";

export default async function register() {
  try {
    let c1 = color.xterm(118);
    let c2 = color.xterm(162);
    let c3 = color.xterm(160);
    let c4 = color.xterm(191);
    console.clear();
    console.log(
      c1(
        `        ----------------------------------------------------------------
        --------------------------REGISTER HERE-------------------------
        ----------------------------------------------------------------`
      )
    );

    let firstName = readline.question(c2("Enter your name:"));
    let lastName = readline.question(c2("Enter your last name:"));
    let email = readline.questionEMail(c2("Enter your email:"));
    let password = readline.question(c2("Enter Password:"), {
      hideEchoBack: true,
    });
    let reEnter = readline.question(c4("Re-type Password:"), {
      hideEchoBack: true,
    });

    recheck();

    function recheck() {
      if (password !== reEnter) {
        console.log("Password doesn't match!!");
        reEnter = readline.question(c4("Re-type Password:"), {
          hideEchoBack: true,
        });
        recheck();
      }
    }

    let phonenumber = readline.question(c2("Enter your phone number with +91:"));
    checker(phonenumber);

    function checker(phonenumber) {
      let numberchecker = phonenumber + "";
      let str = numberchecker.split("");

      if (str.length !== 13) {
        console.log("Invalid phone number!!!");
        phonenumber = readline.question(c2("Enter your phone number with +91:"));
        checker(phonenumber);
      }
    }
    let address = readline.question(c2("Enter your address:"));

    function randomNumber() {
      let count = 5;
      let ran = 0;
      for (let i = 1; i <= count; i++) {
        ran = ran * 10 + Math.floor(Math.random() * 10);
      }
      return ran;
    }
    let otp = randomNumber();

    let { SID, TOKEN, NUMBER } = config.get("SEND_SMS");

    const client = new Twilio(SID, TOKEN);

    async function sendSMS() {
      try {
        await client.messages.create({
          body: `Your OTP is ${otp}`,
          to: `${phonenumber}`,
          from: NUMBER,
        });
      } catch (error) {
        console.log(error);
      }
    }
    await sendSMS();
    let generatedOTP =otp;
    // console.log(generatedOTP);
    
   

    let userOTP = readline.questionInt("Enter your OTP:");

    if (userOTP != generatedOTP) {
      console.log("Wrong OTP Resending OTP again..");
      sendSMS();
    } else {
      let data = {
        firstName,
        lastName,
        email,
        reEnter,
        phonenumber,
        address,
      };
      data.task = [];

      let read = await fs.readFile("db.json", "utf-8");
      let stringtoobject = JSON.parse(read);

      let isDuplicate = stringtoobject.some((element) => {
        // console.log(element.email);

        return (
          element.email === data.email ||
          element.phonenumber === data.phonenumber
        );
      });
      stringtoobject.push(data);

      if (isDuplicate) {
        console.log(c3("Oops Same Entry try again!!!"));
        console.log(
          `        ----------------------------------------------------------------
          --------------------------TRY AGAIN-------------------------
          ----------------------------------------------------------------`
        );
        register();
      } else {
        let objecttostring = JSON.stringify(stringtoobject);
        await fs.writeFile("db.json", objecttostring);

        let load = loading({
          frames: [
            "🕑",
            "🕒",
            "🕓",
            "🕔",
            "🕕",
            "🕖",
            "🕗",
            "🕘",
            "🕙",
            "🕚",
            "🕛",
          ],
          interval: 200,
        }).start();
        console.log("Redirecting to Home Page please wait....");
        console.log(c4("Entry added successfully!"));

        setTimeout(() => {
          load.stop();
          console.clear();
          main();
        }, 3000);
      }
    }
  } catch (e) {
    console.log("error from register.js", e);
  }
}
