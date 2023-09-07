import readline from "readline-sync";
import fs from "fs/promises";
import main from "../app.js";
import color from "cli-color";
import loading from "loading-cli";
import login from "../users/login.js"
import userDate from "../utils/dates.js";

export default async function createTask() {
  try {
    let c1 = color.xterm(118);
    console.clear();
    

    console.log(
      c1(
        `        
          --------------------------CREATE TASKS-------------------------
         `
      )
    );

    let email = readline.questionEMail("Enter Your Email : ");

    let readdb = await fs.readFile("db.json", "utf-8");
    let stringToObject = JSON.parse(readdb);

    let emailFound = stringToObject.find((value) => value.email === email);

    if (!emailFound) {
      console.log("No Email Found, Please Register");
      console.log("Redirecting You To Login 4 Seconds");
      return setTimeout(() => {
        login();
      }, 4000);
    } else {
      let addTodo = readline.question("Enter Your Todo : ");
      let id = Math.random().toString(36).substr(2, 10);
      let todo = addTodo;
      let deadline =readline.question("Enter your Deadline (e.g., 'September 5, 2023', '2023-09-05', or '05042023'): ");
      
      let Deadline =userDate(deadline);
      
      
      emailFound.task.push({ id, todo, Deadline });
      let writeData = JSON.stringify(stringToObject);
      await fs.writeFile("db.json", writeData);
      console.log("Todo Added Succesfully");
      console.log("Redirecting You To Login 4 Seconds");

      let load = loading({
        frames: [1, 2, 3, 4],
        interval: 700,
      }).start();
  
      setTimeout(() => {
        load.stop();
        main();
      }, 4000);
      
    }
  } catch (error) {
    console.log("Something went wrong ....", error);
  }
}
