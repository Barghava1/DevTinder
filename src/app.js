const express=require("express");
const {validate}=require("./helpers/validation")
const app=express();
const bcrypt=require("bcrypt");
const connectDB=require("./config/db");
const User=require("./model/user");
app.use(express.json())

app.post("/signup",async (req,res)=>{
   //validation of user
   try {
   validate(req);

   const {firstName,lastName,email,password}=req.body;
    const saltrounds=10;
   const hashpassword= await bcrypt.hash(password,saltrounds);
   console.log(hashpassword);

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

app.post("/login", async (req,res)=>{
    try{
    const {email,password}=req.body;


    const user=await User.findOne({email:email})

    if(!user)
    {
        throw new Error("User is not present in the DB")
    }



    const isPassword=await bcrypt.compare(password,user.password)

    if(isPassword)
    {
        res.send("Login Sucessfully")
    }
    else
    {
        throw new Error("Password is not correct")
    }
}
catch(error)
{
    res.status(500).send(error.message)
}

})

app.get("/user", async (req,res)=>{
    const usermail=req.body.email;

     try {
        const user=await User.find({email:usermail});

       res.send(user)
        
     } catch (error) {
        res.status(404).send("something went wrong");
        
     }
})

app.get("/feed" ,async (req,res)=>{
    const user=req.body.email;
    try {
        const users=await User.findOne();
        res.send(users);
        
    } catch (error) {
        res.status(404).send("something went wrong");

        
    }
})

app.delete("/user",async (req,res)=>{
    const userid=req.body.userId;
    try {
        const user=await User.findByIdAndDelete(userid);
        res.send("user deleted sucessfully");
        
    } catch (error) {
        res.status(404).send("something went wrong");

        
    }
})

app.patch("/user", async(req,res)=>{
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
        
        res.send("User updated sucessfully");
        
    } catch (error) {
        res.status(400).send("something went wrong"+error.message)
        
    }
})

connectDB().then(()=>{
    console.log("Database connection is established");
    app.listen(8888 ,()=>{
        console.log(`Server is running sucessfully on http://localhost:8888`)
    });
}).catch(()=>{
    console.log("Databse cannot connected")
})




