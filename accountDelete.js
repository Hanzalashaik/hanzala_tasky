import fs from "fs/promises";
import readline from "readline-sync";
import color from "cli-color";
import loading from "loading-cli";
import main from "./app.js";

export default async function deleteall() {
  try {
    let c1 = color.xterm(118);
    console.clear();
    console.log(
      c1(
        `        
          --------------------------DELETE ACCOUNT-------------------------
         `
      )
    );

    let read = await fs.readFile("db.json", "utf-8"); //"[]"

    let stringtoobject = JSON.parse(read);
    let email = readline.questionEMail("Enter your Email:");
    let password = readline.question("Enter your Password:", {
      hideEchoBack: true,
    });

    let confirm = stringtoobject.find((element) => {
      return element.email === email;
    });

    if (!confirm) {
      console.log("Oops try again!!!");
      console.log("Wrong email and password");
      deleteall();
    } else {
      let obj = stringtoobject.filter((element) => {
        return !(element.email === email);
      });

      stringtoobject = obj;

      let objecttostring = JSON.stringify(stringtoobject);
      await fs.writeFile("db.json", objecttostring);
      console.log("Your account has been deleted....");

      console.log("Redirecting to Home Page in 3 seconds ...");
      let load = loading({
        frames: [1, 2, 3, 4],
        interval: 600,
      }).start();

      setTimeout(() => {
        load.stop();
        main();
      }, 4000);
    }
  } catch (error) {
    console.log("Something went wrong....", error);
  }
}
