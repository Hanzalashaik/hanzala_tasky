
export default function userDate(deadline){
    try{

 let input=deadline ;

let userDate;

if (/^\d{8}$/.test(input)) {
  const day = input.substring(0, 2);
  const month = input.substring(2, 4);
  const year = input.substring(4, 8);
  userDate = new Date(`${year}-${month}-${day}`);
} else {    
    userDate = new Date(input);
}


let day = userDate.getDate().toString().padStart(2, '0');
let month = (userDate.getMonth() + 1).toString().padStart(2, '0'); 
let year = userDate.getFullYear();


let formattedDate = `${day}/${month}/${year}`;
return formattedDate;
    }catch(error){
        console.log("Invalid Date pls follow the pattern");
        
    }
}

