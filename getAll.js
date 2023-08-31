import fs from "fs/promises"

export default async function getall(){


    try{
    let read=await fs.readFile("db.json","utf-8")

    let stringtoobject=JSON.parse(read);

    console.log(stringtoobject);


}catch(error){
    console.log("Your Data is not present.....");
    
}

    
}
getall();