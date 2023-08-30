import readline from "readline-sync"
import register from "./register.js";
import login from "./login.js";

export default async function main(){

    try{
        console.log(` 
    ----------------------------------------------------------------
    ---------------------WELCOME TO HANZALA'S TASKY-----------------
    -------------------------SELECT THE OPTIONS---------------------
    ----------------------------------------------------------------
    `);
    
    let options=["For Exit","Register","Login"]

    options.forEach((value,index)=>{
        console.log(`${index+1}.${value}`);
    })

    let option=readline.question("Enter your choice: ")

    if(option< 0 || option>3 ||option==0){
        console.log("Invalid Entry");
        
    }


    switch(option){
    case "1":
        console.log("Thank you");
        break
        
    case "2":
        await register();
        break;

    case "3":
        await login();
        break;
        
    default:
        console.log("Invalid Entry");
        break;        
    }
    }catch(e){
        console.log("error from aap.js",e);
        
    }
}
main()

