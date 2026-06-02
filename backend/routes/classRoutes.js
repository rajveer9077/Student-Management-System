const express=require("express");
const User=require("../models/User");
const School=require("../models/School");
const router=express.Router();
router.post("/add",async(req,res)=>{
    try{
    const data=req.body;
    const user=await User.findById(data.userId);
    if(!user){
        return res.send({success:false,message:"User Not Found"});
    }
    const school=await School.findById(user.school);
    if(!school){
        return res.send({success:false,message:"School Not Found"});
    }
    school.classes.push({className:data.className,subjects:data.subjects});
    const updatedSchoolData=await school.save();
    res.send({success:true,message:"Class Added Successfully",data:updatedSchoolData});}
    catch(err){
        console.log(err);
        res.send({success:false,message:"Error",error:err.message});
    }
})

router.get("/:userId",async(req,res)=>{
    try{
    const userId=req.params.userId;
    const user=await User.findById(userId);
    if(!user){
        return res.send({success:false,message:"User Not Found"});
    }
    const school=await School.findById(user.school);
    if(!school){
        return res.send({success:false,message:"School Not Found"});
    }
    res.send({success:true,message:"Success",data:school.classes});}
    catch(err){
        console.log(err);
        res.send({success:false,message:"Error",error:err.message});
    }
})

router.post("/delete",async(req,res)=>{
    try{
    const data=req.body;
    const user=await User.findById(data.userId);
    if(!user){
        return res.send({success:false,message:"User Not Found"});
    }
    const school=await School.findById(user.school);
    if(!school){
        return res.send({success:false,message:"School Not Found"})
    }
    school.classes=school.classes.filter((el,ix)=>el.className!=data.className);
    const updatedSchoolData=await school.save();
    res.send({success:true,message:"Class Deleted Successfully",data:updatedSchoolData});}
    catch(err){
        console.log(err);
        res.send({success:false,message:"Error",error:err.message});
    }
})
module.exports=router;