import fs from "fs/promises";
import readline from "readline-sync";
import color from "cli-color";
import main from "../app.js";
import loading from "loading-cli";
export default async function getall() {
  try {
    console.clear();
    let c1 = color.xterm(118);

    console.log(
      c1(
        `        
          --------------------------GET ALL TASKS-------------------------
         `
      )
    );
    let email = readline.questionEMail("Enter your Email to check the task:");
    let read = await fs.readFile("db.json", "utf-8");

    let stringtoobject = JSON.parse(read);

    let obj = stringtoobject.find((element) => {
      return element.email === email;
    });

    // console.log(obj);

    let allTask = obj.task;
    // console.log(allTask);

    let myAllTasks = allTask.map((value) => {
      return value.todo;
    });

    

    myAllTasks.forEach((value,index)=> {
      console.log(`${index+1}.${value}`);
            
    });
    console.log("Redirecting to home menu in 2 seconds....");

    let load = loading({
      frames: [1, 2, 3, 4],
      interval: 700,
    }).start();

    setTimeout(() => {
      load.stop();
      main();
    }, 4000);
    
  } catch (error) {
    console.log("Your task is not present.....");
  }
}
