import readline from "readline-sync";
import fs from "fs/promises";
import register from "./register.js";

export default async function login() {
  let email = readline.questionEMail("Enter your Email:");
  let password = readline.question("Enter your Password:", {
    hideEchoBack: true,
  });

  let data = {
    email,
    password,
  };

  let read = await fs.readFile("db.json", "utf-8"); //"[]"

  let stringtoobject = JSON.parse(read); //[]

//   stringtoobject.push(data);

  let isSame = stringtoobject.find((element) => {
    if (element.email === data.email) {
      return true;
    } else {
      return false;
    }
  });
//   console.log("data",data.password);
  
//   console.log("isSame",isSame.password);

  

  if (isSame) {
    if (isSame.password === data.password){
    // let objecttostring = JSON.stringify([data]); //"[]"
    // await fs.writeFile("login.json", objecttostring);
    console.log("Sucessfully loged in!!");
    }
    else{
        console.log("Wrong Password!!!");
        login();
        
    }
  } else {
    console.log("Wrong Email !!");
    login();
  }
}
