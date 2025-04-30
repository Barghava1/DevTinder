const express=require("express");
const app=express();
const connectDB=require("./config/db");
const cookieparser=require("cookie-parser")
app.use(express.json())
app.use(cookieparser())
const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const sendRouter=require("./routes/sendrequest");
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",sendRouter);



connectDB().then(()=>{
    console.log("Database connection is established");
    app.listen(8888, ()=>{
        console.log(`Server is running sucessfully on http://localhost:8888`)
    });
}).catch(()=>{
    console.log("Databse cannot connected")
})




