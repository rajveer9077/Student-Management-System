const express=require("express");
const router=express.Router();
const User=require("../models/User");
router.post("/login",async(req,res)=>{
    const data=req.body;
    const user=await User.findOne({email:data.email});
    if(!user){
        return res.send({success:false,message:"Email Is Not Registered"});
    }
    const isMatchPassword=data.password==user.password;
    if(!isMatchPassword){
        return res.send({success:false,message:"Password Is Incorrect"});
    }
    res.send({success:true,message:"Login Successfully",data:user});
})

router.get("/me/:id",async(req,res)=>{
    try{
    const userId=req.params.id;
    const user=await User.findById(userId);
    if(!user){
        return res.send({success:false,message:"User Not Exists"});
    }
    res.send({success:true,message:"Success",data:user})}
    catch(err){
        res.send({success:false,message:"Error",error:err});
    }
})

module.exports=router;