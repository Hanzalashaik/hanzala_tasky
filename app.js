import readline from "readline-sync";
import register from "./register.js";
import login from "./login.js";
import color from "cli-color";

export default async function main() {
  try {
    let c1 = color.xterm(118);
    let c2 = color.xterm(7);
    let c3 = color.xterm(75);
    let c4 = color.xterm(218);

    console.clear();
    console.log(
      c1(
        `    ----------------------------------------------------------------
    ---------------------WELCOME TO HANZALA'S TASKY-----------------
    -------------------------SELECT THE OPTIONS---------------------
    ----------------------------------------------------------------`
      )
    );

    let options = ["For Exit", "Register", "Login"];

    options.forEach((value, index) => {
      console.log(`${index + 1}.${value}`);
    });

    let option = readline.question("Enter your choice: ");

    if (option < 0 || option > 3 || option == 0) {
      console.log("Invalid Entry");
    }

    switch (option) {
      case "1":
        console.clear();
        console.log("Thank you visit again!!");
        break;

      case "2":

        await register();
        break;

      case "3":
        await login();
        break;

      default:
        console.log(c3("Invalid Entry"));
        break;
    }
  } catch (e) {
    console.log("error from aap.js", e);
  }
}
main();
