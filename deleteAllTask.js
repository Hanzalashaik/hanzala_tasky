import fs from "fs/promises";
import readline from "readline-sync";
import color from "cli-color";
import main from "./app.js";
import loading from "loading-cli";

export default async function deleteUsersTask() {
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

    let email = readline.questionEMail("Enter your Email to delete tasks:");
    let read = await fs.readFile("db.json", "utf-8");

    let stringtoobject = JSON.parse(read);

    const obj = stringtoobject.find((element) => {
      return element.email === email;
    });
    // console.log(obj);

    if (!obj) {
      deleteUsersTask();
    } else {
      let alltask = obj;
      alltask.task = [];
      // console.log(alltask);

      stringtoobject.task = alltask.task;

      // console.log(stringtoobject);

      let objtostring = JSON.stringify(stringtoobject);

      await fs.writeFile("db.json", objtostring);
      console.log("Wait for few seconds....");

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
  } catch (error) {
    console.log("Oops something went wrong....", error);
  }
}
