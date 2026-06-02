const express=require("express");
const User=require("../models/User");
const School=require("../models/School");
const router=express.Router();
router.post("/add",async(req,res)=>{
    try{
    const data=req.body;
    const userData=await User.findById(data.userId);
    if(!userData){
        return res.send({success:false,message:"User Not Found"});
    }
    const schoolData=await School.findById(userData.school);
    if(!schoolData){
        return res.send({success:false,message:"School Not Found"});
    }
    const teacher=new User({
        email:data.teacherEmail,
        password:data.teacherPassword,
        school:userData.school,
        role:"teacher"
    })
    const teacherData=await teacher.save();
    schoolData.teachers.push({name:data.teacherName,id:teacherData._id,class:data.teacherClass});
    const updatedSchoolData=await schoolData.save();
    res.send({success:true,message:"Teacher Added Successfully",data:updatedSchoolData});}
    catch(err){
        console.log(err);
        res.send({success:false,message:"Error",error:err.message});
    }
})

router.get("/:userId",async(req,res)=>{
    const userId=req.params.userId;
    const userData=await User.findById(userId);
    if(!userData){
        return res.send({success:false,message:"User Not Found"});
    }
    const schoolData=await School.findById(userData.school);
    if(!schoolData){
        return res.send({success:false,message:"School Not Found"});
    }
    const allTeacherData=[];
    for(let i=0;i<schoolData.teachers.length;i++){
        const teacher=await User.findById(schoolData.teachers[i].id);
        allTeacherData.push({
            name:schoolData.teachers[i].name,
            class:schoolData.teachers[i].class,
            email:teacher.email,
            password:teacher.password
        })
    }
    // console.log(allTeacherData);
    res.send({success:true,message:"Success",data:allTeacherData})
})

module.exports=router;