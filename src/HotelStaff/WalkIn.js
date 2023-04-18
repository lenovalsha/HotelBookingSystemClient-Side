import AvailableRooms from "../Components/availableRooms";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
export default function WalkIn(){
    const HOTELID = sessionStorage.getItem("hotelId");
    const arrivalDate = (new Date(new Date().getTime()).toISOString().slice(0, 10));
    const departureDate = (new Date(new Date().getTime() + 86400000).toISOString().slice(0, 10));
    //see if we have any available rooms first
    //get all rooms that are available today
    return(<>
   <div className="container">
        <TopBar />
        <Navbar />
        <div className="staff">
        <AvailableRooms Id={HOTELID} arrDate={arrivalDate} depDate={departureDate}/>
      </div>
    </div>
    </>)
}