//this should include dashboard, Rooms, 
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASEPATH} from "../config";
import AddRoom from "./components/room"; //move this later
import Images from "./components/images";
import Register from "./components/staff";
import Navbar from "./Navbar";

function Panel(){
    
    let admin = sessionStorage.getItem("admin");
    let hotelId = sessionStorage.getItem("hotelId");
    
    return(
        <div>
        <Navbar/>
    <h1>This is panel</h1>
    <h2>{admin}</h2>
    <h2>{hotelId}</h2>
    <AddRoom/>
    <Register/>
    </div>
 
    )
}
export default Panel;