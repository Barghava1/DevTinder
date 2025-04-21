const express=require("express");

const app=express();

const {adminauth}=require("./middleware/auth");

app.use("/admin",adminauth)


app.get("/admin/getalldata",(req,res)=>{
    res.send("All data send to admin");
});

app.delete("/admin/delete",(req,res)=>{
    res.send("Admin data deleted");
})


app.listen(8888 ,()=>{
    console.log(`Server is running sucessfully on http://localhost:8888`)
});
