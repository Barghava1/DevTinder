const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
require("dotenv").config()


const userschema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:20
    },
    lastName:{
        type:String,
        minLength:4,
        maxLength:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Email is not valid");
            }
        }
    },
   password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value))
            {
                throw new Error("Password is not valid");
            }
        }
    },
    age:{
        type:String,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value))
            {
                throw new Error("not valid")

            }

        }
    },
    photoUrl:{
        type:String,
        // default:"https:aphotoutl.com",
        // validate(value){
        //     if(!validator.isURL(value))
        //     {
        //         throw new Error("URL is not valid");
        //     }
        // }
    },
    skills:{
        type:[String]
    }
},
{
    timestamps:true
});

userschema.methods.getJWT=async function ()
{
    const user=this;
    const token= await jwt.sign({_id:user.id},"Barghava123@",{expiresIn:"2hr"})

    return token


}

const User=mongoose.model("User",userschema);

module.exports={User};