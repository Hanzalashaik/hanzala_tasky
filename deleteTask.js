import readline from "readline-sync";
import fs from "fs/promises";
import main from "./app.js";
import color from "cli-color";
import loading from "loading-cli";

export default async function taskdelete() {
  try {
    let c1 = color.xterm(118);
    console.clear();
    
    console.log(
      c1(
        `        
          --------------------------DELETE ALL TASKS-------------------------
         `
      )
    );
    let email = readline.questionEMail("Enter your email to delete the task:");
    let id = readline.question("Enter your id:");
    let read = await fs.readFile("db.json", "utf-8");

    let stringtoObject = JSON.parse(read);

    let obj = stringtoObject.find((element) => {
      return element.email === email;
    });
    // console.log(obj.task);

    if (!obj) {
      console.log("Your Email is wrong..");
      taskdelete();
    } else {
      let choose = obj.task.find((element) => {
        return element.id === id;
      });
      //   console.log(choose);

      if (!choose) {
        console.log("Given id is wrong....");
        taskdelete();
      } else {
        choose.todo = "";

        let objtostring = JSON.stringify(stringtoObject);

        await fs.writeFile("db.json", objtostring);
        console.log("task is deleted sucessfully!!");
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
