import Navbar from "./Navbar";
import { useEffect,useState } from "react";
import { BASEPATH } from "../config";
import { useSearchParams } from "react-router-dom";
function Dashboard()
{
    const arrDate = new Date().toISOString().split("T"[0]);
    const depDate = new Date().toISOString().split("T"[0]);
    const [roomCount,setRoomCount] = useState([]);
    const [availableRooms,setAvailableRooms] = useState([]);
    const [reservedRooms,setReservedRooms] = useState([]);

    let admin = sessionStorage.getItem("admin")
    //get the hotelId for this admin
    let HOTELID = sessionStorage.getItem("hotelId");
    //get all rooms
    useEffect(() => {
        async function fetchData() {
          const resp = await fetch(
            BASEPATH +
              `rooms/hotelId/${HOTELID}`
          );
          const data = await resp.json();
          setRoomCount(data);
        }
        fetchData();
      }, []);
    //get all rooms that are available today
    useEffect(() => {
        async function fetchData() {
          const resp = await fetch(
            BASEPATH +
              `rooms/hotelId/${HOTELID}/arrivaldate/${arrDate}/departuredate/${depDate}`
          );
          const data = await resp.json();
          setAvailableRooms(data);
        }
        fetchData();
      }, []);
    //get all rooms that are reserved for today
    useEffect(() => {
        async function fetchData() {
          const resp = await fetch(
            BASEPATH +
              `reservations/hotelId/${HOTELID}/date/${arrDate}`
          );
          const data = await resp.json();
          setReservedRooms(data);
        }
        fetchData();
      }, []);
      const arrivingCount = reservedRooms.filter(room => room.ReservationStatusId ===1).length;
      const departingCount = reservedRooms.filter(room => room.ReservationStatus === 2).length;
      const inHouseCount = reservedRooms.filter(room => room.ReservationStatus === 3).length;
   return(<div className="">
    <Navbar/>
    <h1>Good morning {admin}, {HOTELID}</h1>
    <div className="flex">
    <section>
        <h2>Availability</h2>
        <h3>Total Rooms: {roomCount.length}</h3>
        <h3>Available Rooms To Sell: {availableRooms.length}</h3>
    </section>
    <section>
        <h2>Reservation</h2>
        <div className="flex center">
            <h3>Arriving {arrivingCount}</h3>
            <h3>Departing {departingCount}</h3>
            <h3>In-House {inHouseCount}</h3>
        </div>
    </section>
    <section>
        <h2>Room Status</h2>
    </section>
    </div>
   </div>)
    
}

export default Dashboard;