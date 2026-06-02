const express=require("express");
const School=require("../models/School");
const User=require("../models/User");
const router=express.Router();
router.post("/add",async(req,res)=>{
    try{
    const data=req.body;
    const user=await User.findById(data.id);
    if(!user){
        return res.send({success:false,message:"User Not Found"});
    }
    const school=await School.findById(user.school);
    if(!school){
        return res.send({success:false,message:"School Not Found"});
    }
    school.subjects.push(data.name);
    const schoolNew=await school.save();
    res.send({success:true,message:"Subject Added Successfully",data:schoolNew});}
    catch(err){
        console.log(err);
        res.send({success:false,message:"Error",error:err});
    }
})

router.get("/:id",async(req,res)=>{
    const userId=req.params.id;
    const user=await User.findById(userId);
    if(!user){
        return res.send({success:false,message:"User Not Found"});
    }
    const school=await School.findById(user.school);
    if(!school){
        return res.send({success:false,message:"School Not Found"});
    }
    res.send({success:true,message:"Success",data:school.subjects});
})

router.post("/delete",async(req,res)=>{
    const data=req.body;
    const user=await User.findById(data.id);
    if(!user){
        return res.send({success:false,message:"User Not Found"});
    }
    const school=await School.findById(user.school);
    if(!school){
        return res.send({success:false,message:"School Not Found"});
    }
    school.subjects=school.subjects.filter((subjectName)=>subjectName!=data.subject)
    const newSchoolData=await school.save();
    res.send({success:true,message:"Subject Deleted Successfully",data:newSchoolData});
})

module.exports=router;