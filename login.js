import readline from "readline-sync";
import fs from "fs/promises";
import color from "cli-color";
import register from "./register.js";
import loading from "loading-cli";

export default async function login() {
  let c2 = color.xterm(162);
  let c3 = color.xterm(160);
  let c4 = color.xterm(191);

  let email = readline.questionEMail(c2("Enter your Email:"));
  let password = readline.question(c2("Enter your Password:"), {
    hideEchoBack: true,
  });

  c2(email);
  c4(password);

  let data = {
    email,
    password,
  };

  let read = await fs.readFile("db.json", "utf-8"); //"[]"

  let stringtoobject = JSON.parse(read); //[]

  //   stringtoobject.push(data);

  let isSame = stringtoobject.find((element) => {
    if (element.email === data.email) {
      return true;
    } else {
      return false;
    }
  });
  //   console.log("data",data.password);

  //   console.log("isSame",isSame.password);

  let count = 0;

  if (isSame) {
    if (isSame.password === data.password) {
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

      setTimeout(() => {
        load.stop();
        console.log(c4("Sucessfully loged in!!"));
      }, 3000);
    } else {
      console.log(c3("Wrong Password!!!"));
      console.clear();
      console.log("Re-Enter your Credentials");

      login();
    }
  } else {
    console.log(c3("Wrong Email !!"));
    login();
    count++;
    console.log(count);

    if (count === 1) {
      console.clear();
      console.log(
        `        ----------------------------------------------------------------
        --------------------------REGISTER HERE-------------------------
        ----------------------------------------------------------------`
      );
      console.log(c4("First Register"));

      register();
    }
  }
}
