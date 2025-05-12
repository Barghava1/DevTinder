const express=require("express");
const sendRouter=express.Router();
const {adminauth}=require("../middleware/auth");
const {Connectionrequest}=require("../model/connectionrequest");
const {User}=require("../model/user");


sendRouter.post("/sendrequest/:status/:userId",adminauth,async (req,res)=>{
    try {
        const fromuserId=req.user;
        const touserId=req.params.userId;
        const status=req.params.status;

        const Allowed=["ignored","intrested"];
        if(!Allowed.includes(status)){
            return res.status(400).send({
                message:"Status is not Valid one"
            })
        }

        const user=await User.findOne({
            _id:touserId

        });
        if(!user)
        {
            return res.status(400).send({
                message:"User not found in the database"
            })
        }

        const existing=await Connectionrequest.findOne({
            $or:[
                {fromuserId,touserId},
                {
                    fromuserId:touserId,touserId:fromuserId
                }
            ]})

      if(existing)
      {
        return res.status(400).send({
            message:"Connection request is not valid"
        })
      }

        const connection=new Connectionrequest({
            fromuserId:fromuserId,
            touserId:touserId,
            status:status
        })

      const data= await connection.save();

        res.json({
            message:"Connection request sent suceesfully",
            data
        })
        
    } catch (error) {
        res.status(400).send(error.message)
        
    }
})

sendRouter.post("/reviewrequest/:status/:requestId", adminauth, 
    async(req,res)=>{
    try {
        const Logedinuser=req.user;
        const {status,requestId}=req.params;

   
  

        const Allowed=["accepted","rejected"];
if(!Allowed.includes(status)){
            return res.status(400).json({
                message:"Status is not valid"
            })
        }

    const connect= await Connectionrequest.findOne({
        _id:requestId,
      touserId:Logedinuser._id,
        status:"intrested"
    });
    

    if(!connect)
    {
       return res.status(400).json({
            message:"Connection not found"
        })
    }

    connect.status=status;
    const data=await connect.save();
   

    res.json({ 
        message:"Connection request"+status,
        data
    })

        
    } catch (error) {
        res.status(400).send(error.message)
        
    }

})


module.exports=sendRouter;