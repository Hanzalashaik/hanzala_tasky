import readline from "readline-sync";
import fs from "fs/promises";
import color from "cli-color";
import main from "./app.js";
import loading from "loading-cli";
export default async function login() {
  try {
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

    let emailfound = stringtoobject.find((element) => {
      return (element.email === data.email)
    });

    let passwordfound = stringtoobject.find((element) => {
      return element.password === data.password;
    });


    
    if (!emailfound || !passwordfound) {
      console.log("wrong email and password try again...");
      console.log("Redirecting to login page in 3 seconds ..");

      setTimeout(() => {
        login();
      }, 3000);

    } 
    else {
      console.log(
        "Sucessfully Loged in Redirecting to Home Menu in 4 seconds.."
      );
    }

    let load = loading({
      frames: [1, 2, 3, 4],
      interval: 700,
    }).start();

    setTimeout(() => {
      load.stop();
      main();
    }, 4000);
  } catch (error) {
    console.log(error);
  }
}
