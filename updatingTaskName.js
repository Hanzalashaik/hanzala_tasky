import readline from "readline-sync";
import fs from "fs/promises";



export default async function updating() {
 try{
    let email = readline.questionEMail("Enter your email to update:");
    let id = readline.question("Enter your id:");
    let newtask=readline.question("Enter your new Task:")
    let read = await fs.readFile("db.json", "utf-8");
  
    let stringtoObject = JSON.parse(read);
  
    let obj = stringtoObject.find((element) => {
      return element.email === email;
    });
    // console.log(obj.task);
    
  
    if (!obj) {
      console.log("Your Email is wrong..");
      updating();
      
    }
     else {
  
      let choose = obj.task.find((element) => {
        return element.id === id;
      });
    //   console.log(choose);
      
  
      if (!choose) {
        console.log("Given id is wrong....");
        updating();
      }
      else{
          choose.todo=newtask;
  
          let objtostring=JSON.stringify(stringtoObject);
  
          await fs.writeFile("db.json",objtostring);
          console.log("New Task Updated!!");
          console.log("Redirecting to home menu in 4 seconds....");
          

        //   setTimeout(()=>{
        //     main()
        //   },4000)
      }
    }
 }catch(error){
    console.log("Oops something went wrong!!!");
    
 }
}
updating();
