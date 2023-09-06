import bcrypt from "bcrypt"

export default async function compareHash(user,pass){
    try{
        let hash=pass;
        let userInput=user;
        let compare=await bcrypt.compare(userInput,hash);
        return compare;
        
    }catch(error){

        console.log(error);
        
    }
}
