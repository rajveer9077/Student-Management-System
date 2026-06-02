import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import {toast} from "react-hot-toast"
function ManageStudents(){
    const [showPopUp,setShowPopUp]=useState(false);
    const [classes,setClasses]=useState([]);
    const [studentData,setStudentData]=useState({
        name:"",
        email:"",
        password:"",
        class:""
    })
    const [students,setStudents]=useState([]);
    useEffect(()=>{
        async function getClasses() {
            const res=await fetch(`http://localhost:4400/class/${localStorage.getItem("userId")}`)
            const response=await res.json();
            setClasses(response.data);
        }
        async function getStudents() {
            const res=await fetch(`http://localhost:4400/student/${localStorage.getItem("userId")}`)
            const response=await res.json();
            setStudents(response.data);
        }
        getStudents();
        getClasses();
    },[])
    async function handleAddStudent() {
        const res=await fetch("http://localhost:4400/student/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                ...studentData,userId:localStorage.getItem("userId")
            })
        })
        const response=await res.json();
        if(response.success){
            toast.success("Student Added Successfully");
            const temp=[...students];
            temp.push({name:studentData.name,email:studentData.email,password:studentData.password,class:studentData.class})
            setStudents(temp);

        }
        else{
            toast.error(response.message);
        console.log(response);
    }
    setStudentData({
        name:"",
        email:"",
        password:"",
        class:""
    })
    setShowPopUp(false)
    }
    return <>
    <AdminHeader/>
    <div style={{position:"relative"}}>
        {showPopUp?<div style={{position:"absolute",top:"-80px",height:"90vh",width:"100%",backgroundColor:"rgba(0,0,0,0.9)",display:"flex",justifyContent:"center",alignItems:"center"}} onClick={()=>{
            setShowPopUp(false);
        }}>
            <div style={{width:"50%",height:"60%",backgroundColor:"white",boxShadow:"0px 8px 16px black",display:"flex",justifyContent:"space-around",alignItems:"center",flexDirection:"column"}} onClick={(e)=>e.stopPropagation()}>
                <h1>Add Student</h1>
                <input type="text" style={{width:"80%",height:"30px",fontSize:"18px"}} placeholder="Enter Student Name" value={studentData.name} onChange={(e)=>{
                    setStudentData({...studentData,name:e.target.value})
                }}/>
                <input type="email"   style={{width:"80%",height:"30px",fontSize:"18px"}} placeholder="Enter Student Email" value={studentData.email} onChange={(e)=>{
                    setStudentData({...studentData,email:e.target.value})}}/>
                <input type="password"  style={{width:"80%",height:"30px",fontSize:"18px"}} placeholder="Enter Student Password" value={studentData.password} onChange={(e)=>{
                    setStudentData({...studentData,password:e.target.value})}}/>
                <select style={{width:"70%",height:"30px"}} value={studentData.class} onChange={(e)=>{
                    setStudentData({...studentData,class:e.target.value})}}>
                    <option value="">Select Student Class</option>
                    {classes.map((el,ix)=>{
                        return <option value={el.className}  key={ix}>{el.className}</option>
                    })}
                </select>
                <button style={{width:"60%",height:"30px",backgroundColor:"blue",color:"white",fontSize:"20px",fontWeight:"bold",cursor:"pointer"}} onClick={()=>{
                    handleAddStudent();
                }}>Add</button>
            </div>
        </div>:""}
        <div style={{width:"80%",margin:"auto",marginTop:"80px"}}>
            <div style={{display:"flex",justifyContent:"space-between",height:"80px",alignItems:"center"}}>
                <h1>Manage Students</h1>
                <button style={{width:"20%",height:"60%",backgroundColor:"red",color:"white",fontSize:"20px",fontWeight:"bold",cursor:"pointer"}} onClick={()=>{
                    setShowPopUp(true)
                }}>Add Student</button>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"40px",marginTop:"60px"}}>
                {
                    students.map((el,ix)=>{
                        return <div style={{width:"30%",height:"200px",boxShadow:"0px 4px 18px rgba(0,0,0,0.2)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"10px"}} key={ix}>
                            <h1 style={{fontSize:"20px",color:"gray"}}>Name:{el.name}</h1>
                            <h1 style={{fontSize:"20px",color:"gray"}}>Email:{el.email}</h1>
                            <h1 style={{fontSize:"20px",color:"gray"}}>Password:{el.password}</h1>
                            <h1 style={{fontSize:"20px",color:"gray"}}>Class:{el.class}</h1>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
    </>
}

export default ManageStudents;