import { ShowRooms } from "./components/room"
import Navbar from "./Navbar"
import React from "react";

function AdminRooms(){
    return(

        <div className="body">
            <Navbar/>
            <ShowRooms/>
        </div>
    )
   
}

export default AdminRooms;