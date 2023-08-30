import readline from "readline-sync";
import fs from "fs/promises";

export default async function register() {
  try {
    let firstName = readline.question("Enter your name:");
    let lastName = readline.question("Enter your last name:");
    let email = readline.questionEMail("Enter your email:");
    let password = readline.question("Enter Password:", { hideEchoBack: true });
    let reEnter = readline.question("Re-type Password:", {
      hideEchoBack: true,
    });
    
    let phonenumber = readline.questionInt("Enter your phone number:");
    checker(phonenumber);

    function checker(phonenumber) {
      let numberchecker = phonenumber + "";
      let str = numberchecker.split("");

      if (str.length !== 10) {
        console.log("Invalid phone number!!!");
        phonenumber = readline.questionInt("Enter your phone number:");
        checker(phonenumber);
      }
    }
    let address = readline.question("Enter your address:");

    let data = {
      firstName,
      lastName,
      email,
      password,
      reEnter,
      phonenumber,
      address,
    };


    let read = await fs.readFile("db.json", "utf-8");
    let stringtoobject = JSON.parse(read);
    
    let isDuplicate = stringtoobject.some((element) => {
      // console.log(element.email);
      
        return element.email === data.email || element.phonenumber === data.phonenumber;
    });
    stringtoobject.push(data);


    if (isDuplicate) {
        console.log("Oops Same Entry try again!!!");
    }
    else if (password !== reEnter) {
      console.log("Password doesn't match!!");
      return;
    } 
    else {
        let objecttostring = JSON.stringify(stringtoobject);
        await fs.writeFile("db.json", objecttostring);
        console.log("Entry added successfully!");
    }
   
  } catch (e) {
    console.log("error from register.js", e);
  }
}
