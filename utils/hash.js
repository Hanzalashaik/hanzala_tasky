import bcrypt from "bcrypt"


export default async function hash(pass){
    try{
        let input =pass
        let saltround=10;

        let hash= await bcrypt.hash(input ,saltround);
        return hash;
    
    }catch(error){
        console.log(error);
        
    }
    
}
