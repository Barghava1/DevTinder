const adminauth=(req,res,next)=>{
    const admin_token="xyz";
    const ifauth=admin_token==="xyz"
    if(!ifauth)
    {
        res.status(404).send("unauthoraized user")
    }
    else{
        next();
    }
}

module.exports={
    adminauth
}