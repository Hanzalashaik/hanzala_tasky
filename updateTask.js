import readline from "readline-sync";
import fs from "fs/promises";
import main from "./app.js";
import color from "cli-color";
import loading from "loading-cli";

export default async function updating() {
  try {
    let c1 = color.xterm(118);
    console.clear();
    

    console.log(
      c1(
        `        
          --------------------------UPDATING TASKS-------------------------
         `
      )
    );
    let email = readline.questionEMail("Enter your email to update:");
    let id = readline.question("Enter your id:");
    let newtask = readline.question("Enter your new Task:");
    let read = await fs.readFile("db.json", "utf-8");

    let stringtoObject = JSON.parse(read);

    let obj = stringtoObject.find((element) => {
      return element.email === email;
    });
    // console.log(obj.task);

    if (!obj) {
      console.log("Your Email is wrong..");
      updating();
    } else {
      let choose = obj.task.find((element) => {
        return element.id === id;
      });
      //   console.log(choose);

      if (!choose) {
        console.log("Given id is wrong....");
        updating();
      } else {
        choose.todo = newtask;

        let objtostring = JSON.stringify(stringtoObject);

        await fs.writeFile("db.json", objtostring);
        console.log("New Task Updated!!");
        console.log("Redirecting to home menu in 4 seconds....");

        let load = loading({
          frames: [1, 2, 3, 4],
          interval: 700,
        }).start();
    
        setTimeout(() => {
          load.stop();
          main();
        }, 4000);

      }
    }
  } catch (error) {
    console.log("Oops something went wrong!!!",error);
  }
}
