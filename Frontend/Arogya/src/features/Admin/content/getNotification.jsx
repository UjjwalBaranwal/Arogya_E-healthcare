import React, { useEffect, useState } from "react"
import axios from "axios";
const GetNotification=()=>{
    const [notification,setNotification]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const fetchNotification=async()=>{
        try{
            const response= await axios.get("http://localhost:3000/api/v1/admin/getAllnotification/");
            console.log(response+"notification api has been called");
            setNotification(response)
        }
        catch(err){
            setError(err.message);
            console.log(err);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchNotification();
    },[])
    return(
        <div>

            This is the Notification bar
        </div>
    )
}

export default GetNotification;