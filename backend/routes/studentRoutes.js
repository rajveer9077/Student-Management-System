const express=require("express");
const router=express.Router();
const User=require("../models/User");
const School=require("../models/School");
router.post("/add",async(req,res)=>{
    const data=req.body;
    const userData=await User.findById(data.userId);
    const schoolData=await School.findById(userData.school);
    const student=new User({email:data.email,password:data.password,role:"student",school:userData.school});
    const studentData=await student.save();
    schoolData.students.push({
        name:data.name,
        id:studentData._id,
        class:data.class
    })
    const updatedSchoolData=await schoolData.save();
    res.send({success:true,message:"Success",data:updatedSchoolData});

})

router.get("/:userId",async(req,res)=>{
    const userId=req.params.userId;
    const user=await User.findById(userId);
    const school=await School.findById(user.school);
    const data=[];
    for(let i=0;i<school.students.length;i++){
        const student=await User.findById(school.students[i].id);
        data.push({name:school.students[i].name,email:student.email,
            password:student.password,
            class:school.students[i].class
        })
    }
    res.send({success:true,message:"Success",data:data})
})
module.exports=router;