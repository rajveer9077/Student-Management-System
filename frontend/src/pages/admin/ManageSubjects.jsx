import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader"
import "./ManageSubjects.css"
import toast from "react-hot-toast";
function ManageSubjects(){
    const [showPopUp,setShowPopUp]=useState(false);
    const [subjectName,setSubjectName]=useState("");
    const [allSubjects,setAllSubjects]=useState([]);
    const [selected,setSelected]=useState(-1);
    async function handleSubmit() {
        if(subjectName){
            const res=await fetch("http://localhost:4400/subject/add",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({name:subjectName,id:localStorage.getItem("userId")})
            })
            const response=await res.json();
            console.log(response);
            if(response.success){
                toast.success("Subejct Added Successfully");
                const temp=[...allSubjects];
                temp.push(subjectName);
                setAllSubjects(temp);
                setSubjectName("");
                setShowPopUp(false);
            }
            else{
                toast.error(response.message);
            }
        }
    }
    async function handleDelete(subject) {
        const res=await fetch("http://localhost:4400/subject/delete",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id:localStorage.getItem("userId"),
                subject:subject
            })
        })
        const response=await res.json();
        if(response.success){
            toast.success("Subject Deleted Successfully");
            const temp=allSubjects.filter((subjectName,ix)=>subject!=subjectName);
            setAllSubjects(temp);
            
        }
    }
    useEffect(()=>{
        async function getData() {
            const res=await fetch(`http://localhost:4400/subject/${localStorage.getItem("userId")}`);
            const response=await res.json();
            setAllSubjects(response.data);
        }
        getData();
    },[])
    return <>
    <AdminHeader/>
    {showPopUp?<div id="manage-subjects-pop-up" style={{zIndex:"999"}} onClick={()=>{
        setShowPopUp(false)
    }}>
        <div onClick={(e)=>{
            e.stopPropagation();
        }}>
            <h1>Add Subject</h1>
            <input type="text" placeholder="Enter Subject Name" value={subjectName} onChange={(e)=>{
                setSubjectName(e.target.value);
            }}/>
            <button onClick={()=>{
                handleSubmit();
            }}>Add</button>
        </div>
    </div>:""}
    <div id="manage-subjects">
        <div id="manage-subjects-main">
            <div id="manage-subjects-top">
                <h1>Manage Students</h1>
                <button onClick={()=>{
                    setShowPopUp(true)
                }}>Add Student+</button>
            </div>
            <div id="subjects-cards">
                {allSubjects.map((el,index)=>{
                    return <div key={index} style={{position:"relative",pointerEvents:showPopUp?"none":"auto"}} onClick={()=>setSelected(selected==index?-1:index)}>
                        {selected==index?<div style={{position:"absolute",top:"0px",height:"100%",width:"100%",backgroundColor:"rgba(0,0,0,0.8)",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <button style={{height:"50px",width:"60%",backgroundColor:"rgba(21, 31, 230, 1)",border:"none",color:"white",fontSize:"20px",fontWeight:"bold",cursor:"pointer"}}onClick={()=>handleDelete(el)}>Delete</button>
                        </div>:""}
                        <h1>{el}</h1></div>
                })}
            </div>
        </div>
    </div>
    </>
}

export default ManageSubjects;