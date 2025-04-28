const express=require("express");
const {validate}=require("./helpers/validation")
const app=express();
const bcrypt=require("bcrypt");
const connectDB=require("./config/db");
const {User}=require("./model/user");
const cookieparser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const {adminauth}=require("./middleware/auth")
app.use(express.json())
app.use(cookieparser())

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
        throw new Error("Invalid credentials")
    }



    const isPassword=await bcrypt.compare(password,user.password)

    if(isPassword)
    {
        const token= await jwt.sign({_id:user.id},"Barghava123@",{expiresIn:"1hr"})

      

        res.cookie("token",token)
        res.send("Login Sucessfully")
    }
    else
    {
        throw new Error("Invalid credentials")
    }
}
catch(error)
{
    res.status(500).send(error.message)
}

})

app.post("/sendrequest",adminauth,async(req,res)=>{
    try {
        res.send("Connection request sent ")
        
    } catch (error) {
        res.status(400).send(error)
        
    }
})


app.get("/profile", adminauth,async(req,res)=>{
   try { 
    const user=req.user;
    res.send(user)
}
catch(err)
{
    res.status(400).send(err.message)
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
        const users=await User.find({email:user});
        if(!users)
        {
            throw new Error("Invalid credentials")
        }
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

app.patch("/user", adminauth, async(req,res)=>{
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




