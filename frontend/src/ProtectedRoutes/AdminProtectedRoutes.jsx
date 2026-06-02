import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
function AdminProtectedRoutes({children}){
    const [isAdmin,setIsAdmin]=useState(null);
    async function getData() {
        const userId=localStorage.getItem("userId");
        if(!userId){
            setIsAdmin(false);
            return;
        }
        const res=await fetch(`http://localhost:4400/auth/me/${userId}`)
        const response=await res.json();
        if(response.success && response.data.role=="admin"){
           setIsAdmin(true);
        }
        else{
            setIsAdmin(false);
        }
        
    }
    useEffect(()=>{
        getData();
    },[])
    if(isAdmin==null){
        return <div>Loding...</div>
    }
    else if(isAdmin==true){
        return children
    }
    else{
    return <Navigate to="/login"/>
}
}

export default AdminProtectedRoutes;