const express=require("express");
const profileRouter=express.Router();
const {adminauth}=require("../middleware/auth");
const {User}=require("../model/user");

profileRouter.get("/profile", adminauth,async(req,res)=>{
   try { 
    const user=req.user;
    res.send(user)
}
catch(err)
{
    res.status(400).send(err.message)
}

})

profileRouter.patch("/user", adminauth, async(req,res)=>{
    const userid=req.body.userid;
    const data=req.body;
    const opts={runValidators:true}
    
    try {
       const ALLOWED_UPDATES=["skills","photoUrl","gender","age","userid"];
       const isAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
       if(!isAllowed)
       {
        throw new Error("updates are not allowed")
       }
       if(data?.skills>=10)
       {
        throw new Error("Skills cannot more than 10")
       }
          
        const user=await User.findByIdAndUpdate(userid,data,
            opts
        );
        
        res.send("User updated sucessfully"+user);
        
    } catch (error) {
        res.status(400).send("something went wrong"+error.message)
        
    }
})

profileRouter.delete("/user",async (req,res)=>{
    const userid=req.body.userId;
    try {
        const user=await User.findByIdAndDelete(userid);
        res.send("user deleted sucessfully");
        
    } catch (error) {
        res.status(404).send("something went wrong");

        
    }
})



module.exports=profileRouter;

