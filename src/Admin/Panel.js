//this should include dashboard, Rooms, 
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASEPATH} from "../config";
import Room from "./components/room"; //move this later
import Images from "./components/images";
import AddStaff from "./components/staff";
import Position from "./components/position";

function Panel(){
    
    let admin = sessionStorage.getItem("admin");
    let hotelId = sessionStorage.getItem("hotelId");
    
    return(
        <div>
    <h1>This is panel</h1>
    <h2>{admin}</h2>
    <h2>{hotelId}</h2>
    <Room/>
    <AddStaff/>
    <Position/>

    </div>
 
    )
}
export default Panel;