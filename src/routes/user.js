const express=require("express");
const  userRouter=express.Router();
const {adminauth}=require("../middleware/auth")
const {Connectionrequest}=require("../model/connectionrequest")
const User_data="firstName lastName age gender skills";

userRouter.get("/user/request/recieved", adminauth, async (req,res)=>{
    try {

        const Logedinuser=req.user;

        const connect= await Connectionrequest.find({
            touserId:Logedinuser._id,
            status:"intrested"
        }).populate("fromuserId",User_data)

        const data=connect.map(row=>row.fromuserId)
   
        res.json({message:"Data Fetched",
           data
        })
        
    } catch (error) {
        res.status(400).send("Error"+error.message);
        
    }

})

userRouter.get("/user/connections", adminauth, async(req,res)=>{
    try {
        const Logedinuser=req.user;
        
        const connect=await Connectionrequest.find({
            $or:[
                {touserId:Logedinuser._id,status:"accepted"},
                {fromuserId:Logedinuser._id,status:"accepted"}
                
            ]
        }).populate("fromuserId",User_data)
        .populate("touserId",User_data);
        console.log(connect)



        const data=connect.map(row=>{
           if(row.fromuserId._id.toString()===Logedinuser._id.toString())
           {
            return row.touserId;
           }
           return row.fromuserId;
     })
        res.json({data:data})
        
    } catch (error) {
        res.status(400).send("Error"+error.message)
        
    }
})
module.exports={userRouter}