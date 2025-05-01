const mongoose=require("mongoose");

const connectionrequest= new mongoose.Schema({
    fromuserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    touserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:{
            values:["ignored","intrested","accepted","rejected"],
            message:"value cannot be added"
        }
    }
},{
    timestamps:true
});

connectionrequest.index({fromuserId:1,touserId:1})

connectionrequest.pre("save",function(next){
    const connectionrequest=this;
    if(connectionrequest.fromuserId.equals(connectionrequest.touserId))
    {
        throw new Error("Connection cannot send to user itself")
    }
    next()
})

const Connectionrequest=new mongoose.model(
    " Connectionrequest",
    connectionrequest

);

module.exports={Connectionrequest};