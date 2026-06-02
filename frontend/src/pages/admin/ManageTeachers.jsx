import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import {toast} from "react-hot-toast";
function ManageTeachers(){
    const [showPopUp,setShowPopUp]=useState(false);
    const [teacherName,setTeacherName]=useState("");
    const [teacherEmail,setTeacherEmail]=useState("");
    const [teacherPassword,setTeacherPassword]=useState("");
    const [teacherClass,setTeacherClass]=useState("");
    const [classes,setClasses]=useState([]);
    const [teacherData,setTeacherData]=useState([]);
    useEffect(()=>{
        async function getClasses() {
            const res=await fetch(`http://localhost:4400/class/${localStorage.getItem("userId")}`)
            const response=await res.json();
            setClasses(response.data);
        }
        async function getTeachers() {
            const res=await fetch(`http://localhost:4400/teacher/${localStorage.getItem("userId")}`);
            const response=await res.json();
            setTeacherData(response.data);
        }
        getTeachers();
        getClasses();
    },[])
    async function handleAddTeacher() {
        const res=await fetch("http://localhost:4400/teacher/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                teacherName:teacherName,
                teacherEmail:teacherEmail,
                teacherPassword:teacherPassword,
                teacherClass:teacherClass,
                userId:localStorage.getItem("userId")
            })
        })
        const response=await res.json();
        if(response.success){
            toast.success("Teacher Added Successfully");
            const temp=[...teacherData];
            temp.push({name:teacherName,email:teacherEmail,password:teacherPassword,class:teacherClass})
            setTeacherData(temp);
        }
        else{
            toast.error(response.message);
        }
        setTeacherName("");
        setTeacherClass("");
        setTeacherEmail("")
        setTeacherPassword("");
        setShowPopUp(false);
        console.log(response);
    }
    return <>
    <AdminHeader/>
    <div style={{position:"relative"}}>
       {showPopUp? <div style={{position:"absolute",display:"flex",justifyContent:"center",alignItems:"center",top:"-80px",backgroundColor:"rgba(0,0,0,0.9)",height:"90vh",width:"100%"}} onClick={()=>{
        setShowPopUp(false);
       }}>
            <div style={{height:"60%",width:"40%",backgroundColor:"white",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"40px",boxShadow:"0px 8px 16px black"}} onClick={(e)=>e.stopPropagation()}>
                <h1>Add Teacher</h1>
                <input type="text" placeholder="Enter Teacher Name" style={{width:"70%",height:'30px',fontSize:"18px"}} value={teacherName} onChange={(e)=>setTeacherName(e.target.value)}/>
                <input type="email" placeholder="Enter Teacher Email" style={{width:"70%",height:'30px',fontSize:"18px"}} value={teacherEmail} onChange={(e)=>setTeacherEmail(e.target.value)}/>
                <input type="password" placeholder="Enter Teacher Password" style={{width:"70%",height:'30px',fontSize:"18px"}} value={teacherPassword} onChange={(e)=>setTeacherPassword(e.target.value)}/>
                <select style={{width:"60%",height:"30px"}} value={teacherClass} onChange={(e)=>setTeacherClass(e.target.value)}>
                    <option value="">Select Teacher Class</option>
                    {classes.map((el,ix)=>{
                        return <option value={el.className} key={ix}>{el.className}</option>
                    })}
                </select>
                <button style={{width:"50%",backgroundColor:"red",color:"white",fontSize:"20px",fontWeight:"bold",cursor:"pointer"}} onClick={()=>{
                    handleAddTeacher();
                }}>Add</button>
            </div>
        </div>:""}
        <div style={{width:"80%",margin:"auto",marginTop:"80px"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <h1>Manage Teachers</h1>
                <button style={{width:"20%",backgroundColor:"green",color:"white",fontSize:"17px",fontWeight:"bold",cursor:"pointer"}} onClick={()=>{
                    setShowPopUp(true)
                }}>Add Teacher</button>
            </div>
            <div style={{marginTop:"80px",display:"flex",gap:"50px"}}>
                {
                    teacherData.map((el,ix)=>{
                        return <div style={{width:"30%",height:"200px",boxShadow:"0px 4px 18px rgba(0,0,0,0.2)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"10px"}}key={ix}>
                            <h1 style={{fontSize:"20px",color:"grey"}}>Name:{el.name}</h1>
                            <h1 style={{fontSize:"20px",color:"grey"}}>Class:{el.class}</h1>
                            <h1 style={{fontSize:"20px",color:"grey"}}>Email:{el.email}</h1>
                            <h1 style={{fontSize:"20px",color:"grey"}}>Password:{el.password}</h1>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
    </>
}

export default ManageTeachers;