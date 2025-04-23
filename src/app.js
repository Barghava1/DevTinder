const express=require("express");
const app=express();
const connectDB=require("./config/db");
const User=require("./model/user");
app.use(express.json())
app.post("/signup",async (req,res)=>{
   

    const user=new User(req.body);
    try {
        await user.save();
    res.send("user created sucessfully");
        
    } catch (error) {
        res.status(500).send("User not created")
        
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
    
    try {
       
          
        const user=await User.findByIdAndUpdate(userid,data);
        
        res.send("User updated sucessfully");
        
    } catch (error) {
        res.status(400).send("something went wrong")
        
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




