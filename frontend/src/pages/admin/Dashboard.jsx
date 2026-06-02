import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import "./Dashboard.css"
function Dashbaord(){
    const [data,setData]=useState({
        teachers:"0",
        students:"0",
        subjects:"0",
        classes:"0"
    })
    useEffect(()=>{
        async function getData() {
            const res=await fetch(`http://localhost:4400/school/dashboard/${localStorage.getItem("userId")}`)
            const response=await res.json();
            setData(response.data);
        }
        getData();
    },[])
    return <>
    <AdminHeader/>
    <div id="dashboard-cards">
        <div style={{marginTop:"100px",display:"flex",justifyContent:"center"}}><h1>Welcome Admin</h1></div>
        <div>
            <div>
                <h1>Total Teachers</h1>
                <h1>{data.teachers}</h1>
            </div>
            <div>
                <h1>Total Students</h1>
                <h1>{data.students}</h1>
            </div>
            <div>
                <h1>Total Subjects</h1>
                <h1>{data.subjects}</h1>
            </div>
            <div>
                <h1>Total Classes</h1>
                <h1>{data.classes}</h1>
            </div>
        </div>
    </div>
    </>
}

export default Dashbaord;