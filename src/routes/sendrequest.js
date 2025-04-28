const express=require("express");
const sendRouter=express.Router();
const {adminauth}=require("../middleware/auth")

sendRouter.post("/sendrequest",adminauth,async(req,res)=>{
    try {
        res.send("Connection request sent ")
        
    } catch (error) {
        res.status(400).send(error)
        
    }
})


module.exports=sendRouter;