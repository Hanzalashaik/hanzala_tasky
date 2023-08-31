import fs from "fs/promises"
import readline from "readline-sync"


export default async function deleteall(){

    try{
        let read=await fs.readFile("db.json","utf-8");//"[]"

    let stringtoobject=JSON.parse(read);
    let email=readline.question("Enter your Email:");
    let password=readline.question("Enter your Password:");

    let confirm = stringtoobject.find((element) => {
        return element.email === email && element.password === password;
    });
    
    if (!confirm) {
        console.log("Oops try again!!!");
        console.log("Wrong email and password");
        deleteall();
    } else {
        // Remove the matching element from the array
        stringtoobject = stringtoobject.filter((element) => {
            return !(element.email === email && element.password === password);
        });
    }
    console.log(stringtoobject);
    
    
    let objecttostring = JSON.stringify(stringtoobject);
    
    await fs.writeFile("db.json", objecttostring);
    console.log("All the accounts have been deleted....");
    
}catch(error){
    console.log("Something went wrong....",error);
    
}


}
deleteall()