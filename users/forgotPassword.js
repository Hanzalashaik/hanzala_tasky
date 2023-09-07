import readline from "readline-sync";
import fs from "fs/promises";
import color from "cli-color";
import loading from "loading-cli";


import main from "../app.js";
import hash from "../utils/hash.js";
import randomNumber from "../utils/randomNumber.js";

export default async function forgotPassword() {
  try {
    let c1 = color.xterm(118);
    console.clear();
    

    console.log(
      c1(
        `        
          --------------------------Forgot Password-------------------------
         `
      )
      );
    let otp=randomNumber(5);
    let email = readline.questionEMail("Enter your Email: ");
    let newPass = readline.question("Enter your new Password: ",{hideEchoBack:"true"});
    console.log(otp);
    let userotp=readline.question("Enter your OTP:")
    
    let read = await fs.readFile("db.json", "utf-8");

    let stringtoObject = JSON.parse(read);
    
    

    let obj = stringtoObject.find((element) => {
      return element.email === email;
    });

    //    await send_EMAIL({
    //     subject:"this text subject",
    //     text:`Your OTP is ${otp}`,
    //     to:email
    // })
    

      
        if(!obj){
            console.log("Oops Wrong Email Try Again!!");

            setTimeout(() => {
                main();
              }, 2000);
            
        }else if(userotp != otp){
            console.log("Wrong Otp Try Again!!");
          
              setTimeout(() => {
                main();
              }, 2000);
            
        }
        else{
            obj.password = await hash(newPass);   
        // console.log(stringtoObject);
        

        let objtostring = JSON.stringify(stringtoObject);

        await fs.writeFile("db.json", objtostring);
        console.log("New Password Updated!!");
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
    console.log("Oops something went wrong!!!",error);
  }
}
