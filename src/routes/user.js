const express=require("express");
const  userRouter=express.Router();
const {adminauth}=require("../middleware/auth")
const {Connectionrequest}=require("../model/connectionrequest");
const { User } = require("../model/user");
const User_data="firstName lastName age gender skills photoUrl";

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
});

userRouter.get("/feed", adminauth, async (req,res)=>{
  
    try {

        const page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10;
        limit=limit>50?50:limit;
        const skip=(page-1)*limit;

        const Logedinuser=req.user;
   

        const connect=await Connectionrequest.find({
            $or:[
                {fromuserId:Logedinuser._id},
                {touserId:Logedinuser._id}
            ]
        });

      const hiddenuser=new Set();
      connect.forEach((req)=>{
        hiddenuser.add(req.fromuserId._id.toString())
        hiddenuser.add(req.touserId._id.toString())
      });
      const users=await User.find({
        $and:[
            {_id:{$nin:Array.from(hiddenuser)}},
            {_id:{$ne:Logedinuser._id}}
        ]
      }).select(User_data).skip(skip).limit(limit);
      

        res.send(users);

        
    } catch (error) {
        res.status(400).send("Error"+error.message);
        
    }
})
module.exports={userRouter}