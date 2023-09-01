import readline from "readline-sync";
import fs from "fs/promises";
import color from "cli-color";
import register from "./register.js";
import loading from "loading-cli";
import task from "./addtask.js";

export default async function login() {

  try{
  let c1 = color.xterm(118);
  let c2 = color.xterm(162);
  let c3 = color.xterm(160);
  let c4 = color.xterm(191);

  console.clear();
        console.log(
          c1(
            `        ----------------------------------------------------------------
            --------------------------LOGIN HERE----------------------------
            ----------------------------------------------------------------`
          )
        );

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

  let isSame = stringtoobject.find((element) => {
    if (element.email === data.email) {
      return true;
    } else {
      return false;
    }
  });

  let count = 0;

  if (isSame) {
    if (isSame.password === data.password) {
      console.log(`Wait for few seconds ....`);

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
        interval: 500,
      }).start();

      setTimeout(() => {
        load.stop();
        task();
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
    console.log(c3("Try Again !!"));
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
}catch(error){
  console.log(error);
  
}
}

