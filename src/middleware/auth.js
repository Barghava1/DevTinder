const jwt=require("jsonwebtoken")
const {User}=require("../model/user")
require("dotenv").config();
const adminauth= async (req,res,next)=>{
    try { 
        const cookies=req.cookies;
    
        const {token}=cookies;
        
        if(!token)
        {
            throw new Error("token is not valid");
        }
        const decoded= await jwt.verify(token,process.env.JWT_SECRET_KEY)
        
        const {_id}=decoded
      
        const user= await User.findOne({_id:_id})
       
        if(!user)
        {
            throw new Error("Invalid Credentials");
        }
        req.user=user;
        next()
}
catch(error)
{
    res.status(400).send(error.message)
}
}

module.exports={
    adminauth
}