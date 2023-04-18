import { useEffect,useState } from "react";
import { BASEPATH } from "../../config";
import CheckingIn,{CheckingOut} from "./checkin";
//get a list of reservations that are arriving today
export default function Arriving(){
  const arrDate= (new Date(new Date().getTime()).toISOString().slice(0, 10));

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
    <div className="staff-reservation">
    <div>
      <h1>Arriving</h1>
        {reservedRooms.filter(room => room.ArrivalDate === arrDate+"T00:00:00" && room.ReservationStatusId!==1).map((e)=>(
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
export function Departing(){
  const today= (new Date(new Date().getTime()).toISOString().slice(0, 10));

    const [reservedRooms,setReservedRooms] = useState([]);
    const [showForm, setShowForm] = useState(false);

    let HOTELID = sessionStorage.getItem("hotelId");

    //get a list of all reservations coming today
    useEffect(() => {
        async function fetchData() {
          const resp = await fetch(
            BASEPATH +
              `reservations/hotelId/${HOTELID}/date/${today}`
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
    <div className="staff-reservation">
    <div>
      <h1>Departing</h1>
        {reservedRooms.filter(room => room.DepartureDate === today+"T00:00:00" && room.ReservationStatusId===1).map((e)=>(
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
        <CheckingOut onClose={()=>{setShowForm(false)}}/>
      )}
      </div>

    </div>
    </>)
}