import readline from "readline-sync";
import fs from "fs/promises";
import color from "cli-color";
import loading from "loading-cli";
import main from "./app.js";

import sendSMS from "./utils/sms.js"
import send_EMAIL from "./utils/email.js"
import randomNumber from "./utils/randomNumber.js";

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

    let phonenumber = readline.question(c2("Enter your phone number"));
      let verifyPhone = "+91" + phonenumber;
    checker(phonenumber);

    function checker(phonenumber) {
      let numberchecker = phonenumber + "";
      let str = numberchecker.split("");

      if (str.length !== 10) {
        console.log("Invalid phone number!!!");
        phonenumber = readline.question(c2("Enter your phone number with +91:"));
        checker(phonenumber);
      }
    }
    let address = readline.question(c2("Enter your address:"));
    console.log("Wait for few seconds...");
    

    let otp=randomNumber(5);

    //sending OTP from SMS
    await sendSMS({
      body:`Your OTP is ${otp}`,
      phonenumber:verifyPhone

    });
    // console.log("send sms");
    // console.log(otp);
    
    
    
    // Sending OTP FROM EMAIL
    await send_EMAIL({
      subject:"this text subject",
      text:`Your OTP is ${otp}`,
      to:email
  })
  //  console.log("Send Email");
  //  console.log(otp);
   
   

    let userOTP = readline.questionInt("Enter your OTP:");

    if (userOTP != otp) {
      console.log("Wrong OTP Resending OTP again..");
      sendSMS();
    } else {
      let data = {
        firstName,
        lastName,
        email,
        password,
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
        return console.log(c3("Oops Same Entry try again!!!"));
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
          interval: 700,
        }).start();
        console.log("Redirecting to Home Page please wait....");
        console.log(c4("Entry added successfully!"));

        setTimeout(() => {
          load.stop();
          console.clear();
          main();
        }, 4000);
      }
    }
  } catch (e) {
    console.log("error from register.js", e);
  }
}
