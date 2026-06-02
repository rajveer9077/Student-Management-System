import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import {toast} from "react-hot-toast";
import "./ManageClasses.css"
function ManageClasses(){
    const [showPopUp,setShowPopUp]=useState(false);
    const [allSubjects,setAllSubjects]=useState([]);
    const [className,setClassName]=useState("");
    const [subjects,setSubjects]=useState([]);
    const [allClasses,setAllClasses]=useState([]);
    const [selected,setSelected]=useState(-1);
    useEffect(()=>{
        async function getSubjects() {
            const res=await fetch(`http://localhost:4400/subject/${localStorage.getItem("userId")}`)
            const response=await res.json();
            setAllSubjects(response.data);
        }
        async function getClasses() {
            const res=await fetch(`http://localhost:4400/class/${localStorage.getItem("userId")}`)
            const response=await res.json();
            setAllClasses(response.data);
        }
        getClasses();
        getSubjects();

    },[])

    async function handleSubmit() {
        const res=await fetch("http://localhost:4400/class/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({userId:localStorage.getItem("userId"),
                className:className,
                subjects:subjects
            })
        })
        const response=await res.json();
        if(response.success){
            toast.success("Class Added Successfully");
            const temp=[...allClasses];
            temp.push({className:className,subjects:subjects});
            setAllClasses(temp);
        }
        else{
        console.log(response);
            toast.error(response.message);
        }
        setClassName("");
        setSubjects([]);
        setShowPopUp(false);
    }

    async function handleDelete(className) {
        const res=await fetch("http://localhost:4400/class/delete",{method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({userId:localStorage.getItem("userId"),
                className:className
            })
        })
        const response=await res.json();
        console.log(response);
        if(response.success){
            toast.success("Class Deleted Successfully");
            let temp=[...allClasses];
            temp=temp.filter((el)=>{
                return el.className!=className
            })
            setAllClasses(temp);
        }
        else{
            toast.error(response.message);
        }
    }
    return <>
    <AdminHeader/>
    {showPopUp?<div id="add-class-pop-up" onClick={()=>{
        setShowPopUp(false);
    }} style={{zIndex:"999"}}>
        <div onClick={(e)=>e.stopPropagation()}>
            <h1>Add Class</h1>
            <input type="text" placeholder="Enter Class Name" value={className} onChange={(e)=>{setClassName(e.target.value)}}/>
            <div>
            {allSubjects.map((element,index)=>{
                return <label key={index}><input type="checkbox" value={element} onChange={(e)=>{
                    if(subjects.includes(element)){
                        let temp=[...subjects];
                        console.log(subjects,element)
                        temp=temp.filter((el)=>el!=element)
                        setSubjects(temp);
                    }
                    else{
                        const temp=[...subjects];
                        temp.push(element);
                        setSubjects(temp);
                    }
                }} checked={subjects.includes(element)} />{element}</label>
            })}
            </div>
            <div style={{marginBottom:"50px",width:"100%",textAlign:"center"}}><button style={{width:"60%",height:"30px",backgroundColor:"blue",color:"white",fontSize:"20px",cursor:"pointer"}} onClick={()=>{
                handleSubmit();
            }}>Add</button></div>
        </div>
    </div>:""}
    <div id="manage-classes">
        <div id="manage-classes-main">
            <div id="manage-classes-top">
                <h1>Manage Classes</h1>
                <button onClick={()=>{
                    setShowPopUp(true)
                }}>Add Class+</button>
            </div>
            <div id="classes-cards">
                {allClasses.map((el,ix)=>{
                    return <div key={ix} style={{position:"relative"}} onClick={()=>setSelected(selected==ix?-1:ix)}>
                        {selected==ix?<div style={{position:"absolute",top:"0px",height:"100%",width:"100%",backgroundColor:"rgba(0,0,0,0.8)",display:'flex',justifyContent:"center",alignItems:"center"}}>
                            <button style={{width:"70%",height:"20%",backgroundColor:"red",color:"white",fontSize:"20px",fontWeight:"bold",cursor:"pointer"}} onClick={()=>{
                                handleDelete(el.className);
                            }}>Delete</button>
                        </div>:""}
                    <div style={{color:"green"}}>{el.className}</div>
                    <ul style={{fontSize:"20px"}}>
                        <h1 style={{fontSize:"20px",marginBottom:"15px"}}>Subjects:</h1>
                    {el.subjects.map((el2,ix2)=>{
                        return <li style={{marginBottom:"10px",color:"blue"}}>{el2}</li>
                    })}
                    </ul>
                    </div>
                    
                })}
            </div>
        </div>
    </div>
    </>
}

export default ManageClasses;