import { useEffect,useState } from "react";
import { BASEPATH } from "../../config";
import CheckingIn from "./checkin";
//get a list of reservations that are arriving today
export default function Arriving(){
    const arrDate = new Date().toISOString().split("T"[0]);
    const [reservedRooms,setReservedRooms] = useState([]);
    const [showForm, setShowForm] = useState(false);

    let HOTELID = sessionStorage.getItem("hotelId");

    //get a list of all reservations coming today
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
     function CheckIn(props)
      {
        sessionStorage.setItem("reservationId", props.Id);
        setShowForm(true)
      }
    return(<>
    <div className="">
    <div className="">
      <h1>Arriving</h1>
        {reservedRooms.filter((x)=>x.ReservationStatusId === 1).map((e)=>(
            <div className="row" key={e.Id}>
                <label>Room Number: {e.RoomNumber} </label>
                <label>First Name: {e.Guest.FirstName}</label>
                <label>Last Name: {e.Guest.LastName}</label>
                <button
            onClick={() =>
              CheckIn(e)
            }
          >
            Check-In
          </button>
            </div>
           
        ))}
        {showForm && (
        <CheckingIn onClose={()=>{setShowForm(false)}}/>
      )}
      </div>

    </div>
    </>)
}