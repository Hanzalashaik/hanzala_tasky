import readline from "readline-sync";
import fs from "fs/promises";
import color from "cli-color";
import loading from "loading-cli";

export default async function register() {
  try {
    let c2 = color.xterm(162);
    let c3 = color.xterm(160);
    let c4 = color.xterm(191);

    let firstName = readline.question(c2("Enter your name:"));
    let lastName = readline.question(c2("Enter your last name:"));
    let email = readline.questionEMail(c2("Enter your email:"));
    let password = readline.question(
      c2("Enter Password:"), { hideEchoBack: true }
    );
    let reEnter = readline.question(
      c4("Re-type Password:"), {
        hideEchoBack: true,
      }
    );

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

    let phonenumber = readline.questionInt(c2("Enter your phone number:"));
    checker(phonenumber);

    function checker(phonenumber) {
      let numberchecker = phonenumber + "";
      let str = numberchecker.split("");

      if (str.length !== 10) {
        console.log("Invalid phone number!!!");
        phonenumber = readline.questionInt(c2("Enter your phone number:"));
        checker(phonenumber);
      }
    }
    let address = readline.question(c2("Enter your address:"));

    let data = {
      firstName,
      lastName,
      email,
      password,
      reEnter,
      phonenumber,
      address,
    };

    let read = await fs.readFile("db.json", "utf-8");
    let stringtoobject = JSON.parse(read);

    let isDuplicate = stringtoobject.some((element) => {
      // console.log(element.email);

      return (
        element.email === data.email || element.phonenumber === data.phonenumber
      );
    });
    stringtoobject.push(data);

    if (isDuplicate) {
      console.log(c3("Oops Same Entry try again!!!"));
    } else {
      let objecttostring = JSON.stringify(stringtoobject);
      await fs.writeFile("db.json", objecttostring);
      let load=loading({
        frames:["🕑","🕒","🕓","🕔","🕕","🕖","🕗","🕘","🕙","🕚","🕛"],
        interval:200
      }).start()

      setTimeout(()=>{
        load.stop();
        console.log(c4("Entry added successfully!"));
      },3000)
     
    }
  } catch (e) {
    console.log("error from register.js", e);
  }
}
