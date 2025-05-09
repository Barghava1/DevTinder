const express=require("express");
const app=express();
const connectDB=require("./config/db");
const cookieparser=require("cookie-parser");
const cors=require("cors");


const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const sendRouter=require("./routes/sendrequest");
const { userRouter } = require("./routes/user");

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  };

  app.use(cors(corsOptions));
 
  

app.use(express.json());
app.use(cookieparser());


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",sendRouter);
app.use("/",userRouter);



connectDB().then(()=>{
    console.log("Database connection is established");
    app.listen(8888, ()=>{
        console.log(`Server is running sucessfully on http://localhost:8888`)
    });
}).catch(()=>{
    console.log("Databse cannot connected")
})




