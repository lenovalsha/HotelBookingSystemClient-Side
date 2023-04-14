import AvailableRooms from "../Components/availableRooms";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import { useState } from "react";
export default function WalkIn(){
    const HOTELID = sessionStorage.getItem("hotelId");
    const [arrivalDate, setArrivalDate] = useState(new Date().toISOString().split("T"[0]));
    const [departureDate, setDepartureDate] = useState(new Date().toISOString().split("T"[0]));

    //see if we have any available rooms first
    //get all rooms that are available today
    return(<>
   <div className="container">
      <TopBar />
        <div className="staff">
        <Navbar />
        <AvailableRooms Id={HOTELID} arrDate={arrivalDate} depDate={departureDate}/>
      </div>
    </div>
    </>)
}