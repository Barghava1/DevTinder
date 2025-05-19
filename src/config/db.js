const mongoose=require("mongoose");
require("dotenv").config();

const connectDB= async ()=>{
    await mongoose.connect("mongodb+srv://barghavachitturi179:barghava123@barghavanode.skqvt7d.mongodb.net/devTinder")
}

module.exports=connectDB;