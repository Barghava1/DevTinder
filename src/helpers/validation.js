const validator=require("validator");
const validate=(req)=>{
    const {firstName,lastName,email,password}=req.body;
    if(!firstName||!lastName)
    {
        throw new Error("Name is not valid")
    }
    else if(firstName.length<4||firstName.length>50)
    {
        throw new Error("Name should be in desitred charactres")
    }
    else if(lastName.length<4||lastName.length>50)
        {
            throw new Error("Name should be in desitred charactres")
        }
    else if(!validator.isEmail(email))
    {
        throw new Error("Email api is not valid")
    }
    else if(!validator.isStrongPassword(password))
     {
            throw new Error("Password is not valid")
     }
        
    

}
module.exports={
    validate
}