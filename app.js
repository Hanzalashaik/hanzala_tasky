import readline from "readline-sync";
import register from "./register.js";
import login from "./login.js";
import color from "cli-color";
import createTask from "./createTask.js";
import getall from "./getAllTask.js"
import updating from "./updateTask.js"
import taskdelete from "./deleteTask.js"
import deleteUsersTask from "./deleteAllTask.js"
import deleteall from "./accountDelete.js"

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

    let options = ["For Exit", "Register", "Login","Create Task","Get All Task","Update Task","Delete Task","Delete All Task","Delete Account"];

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

      case "4":
        await createTask();
        break;

      case "5":
        await getall();
        break;

      case "6":
        await updating();
        break;

      case "7":
        await taskdelete();
        break;

      case "8":
        await deleteUsersTask();
        break;

      case "9":
        await deleteall();
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
