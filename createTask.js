import readline from "readline-sync";
import fs from "fs/promises";
import main from "./app.js";
import color from "cli-color";
import loading from "loading-cli";
import login from "./login.js"

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
      let deadline = readline.question("Enter your Deadline (dd/mm/yyyy):");
        
      emailFound.task.push({ id, todo, deadline });
      let writeData = JSON.stringify(stringToObject);
      await fs.writeFile("db.json", writeData);
      console.log("Todo Added Succesfully");
      console.log("Redirecting You To Login 4 Seconds");

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
    console.log("Something went wrong ....", error);
  }
}
