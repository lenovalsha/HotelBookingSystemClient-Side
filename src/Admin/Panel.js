//this should include dashboard, Rooms, 
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASEPATH,ADMIN,HOTELID } from "../config";
import Room from "./components/room"; //move this later
import RoomImages from "./components/roomImages"; //move this later


function Panel(){
    let admin = sessionStorage.getItem("admin");
    let hotelId = sessionStorage.getItem("hotelId");
    const [hotelData,setHotelData] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchData = async() => {
            const resp = await fetch(BASEPATH+"hotels/adminusername/" + admin);
            if(resp.ok)
            {
                const data = await resp.json();
                setHotelData(data);
                hotelData.map((x)=>(
                sessionStorage.setItem("hotelId",x.Id)
            ))
                console.log("This is the Admin: " +admin);
                console.log("This is the hotelID:" +  hotelId);
            }else
            {
                navigate("/hotel");
            }
        };
        fetchData();
    },[]);
    return(
    <div>
    <h1>This is panel</h1>
    <Room/>
    <RoomImages/>
    </div>
 
    )
}
export default Panel;