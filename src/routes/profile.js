const express=require("express");
const profileRouter=express.Router();
const {adminauth}=require("../middleware/auth");
const {User}=require("../model/user");
const {validatedata}=require("../helpers/validation")
const bcrypt=require("bcrypt");

profileRouter.get("/profile/view", adminauth,async(req,res)=>{
   try { 
    const user=req.user;
    res.send(user)
}
catch(err)
{
    res.status(400).send(err.message)
}

})

profileRouter.patch("/profile/edit", adminauth, async (req, res) => {
    try {
      if (!validatedata(req)) {
        throw new Error("Invalid Edit Request");
      }
  
      const loggedInUser = req.user;
  
      Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
  
      await loggedInUser.save();
  
      res.json({
        message: `${loggedInUser.firstName}, your profile updated successfuly`,
        data: loggedInUser,
      });
      
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });

profileRouter.delete("/user",async (req,res)=>{
    const userid=req.body.userId;
    try {
        const user=await User.findByIdAndDelete(userid);
        res.send("user deleted sucessfully");
        
    } catch (error) {
        res.status(404).send("something went wrong");

        
    }
})

profileRouter.patch("/profile/forgotpassword", async (req,res)=>{
  
  try {
    const {email,password}=req.body;
 
    const user=await User.findOne({email});
   
    if(!user)
    {
      throw new Error("Invalid credentials")
    }
   const saltrounds=10;
   const hashpassword= await bcrypt.hash(password,saltrounds);

   const updateduser=await User.findOneAndUpdate({email:email},{password:hashpassword},{new:true});

   res.send("passsword updated");




    
  } catch (error) {
    res.status(400).send("error"+error)
    
  }


})



module.exports=profileRouter;

