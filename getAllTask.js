import fs from "fs/promises"
import readline from "readline-sync";


export default async function getall(){


    try{

        console.clear()
        let email=readline.questionEMail("Enter your Email to check the task:")
    let read=await fs.readFile("db.json","utf-8")

    let stringtoobject=JSON.parse(read);

        let obj=stringtoobject.find((element)=>{
            return element.email===email;
        })
    
        let alltask=obj;

        console.log(alltask.task);
        


}catch(error){
    console.log("Your task is not present.....");
    
}

    
}
getall();