const express=require("express");
const authRouter=express.Router();
const {User}=require("../model/user");
const bcrypt=require("bcrypt");
const {validate}=require("../helpers/validation");

authRouter.post("/signup",async (req,res)=>{
    //validation of user
    try {
    validate(req);
 
    const {firstName,lastName,email,password}=req.body;
     const saltrounds=10;
    const hashpassword= await bcrypt.hash(password,saltrounds);
 
 
     const user=new User({
         firstName,
         lastName,
         email,
         password:hashpassword
     });
  
         await user.save();
     res.send("user created sucessfully");
         
     } catch (error) {
         res.status(500).send(error.message)
         
     }
 
     
 
 })

 authRouter.post("/login", async (req,res)=>{
     try{
     const {email,password}=req.body;
 
 
     const user=await User.findOne({email:email})
 
     if(!user)
     {
         throw new Error("Invalid credentials")
     }
 
 
 
     const isPassword=await bcrypt.compare(password,user.password)
 
     if(isPassword)
     {
         const token=await user.getJWT()
 
       
 
         res.cookie("token",token)
         res.send(user);
     }
     else
     {
         throw new Error("Invalid credentials")
     }
 }
 catch(error)
 {
     res.status(500).send(error.message)
 }
 
 })

 authRouter.post("/logout", async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    });
    res.send("Logout sucessfull");
 })




 module.exports=authRouter;
 