const express=require("express");

const app=express();

app.get("/",(req,res)=>{
    res.send("Hello Barghava! how are you")
})

app.get("/profile",(req,res)=>{
    res.send("Hello Profil")
})

app.get("/test",(req,res)=>{
    res.send("Hello Test")
})

app.listen(8888 ,()=>{
    console.log("Server is running sucessfully on port 8888")
});
