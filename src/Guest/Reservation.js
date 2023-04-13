import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASEPATH } from "../config";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Reservation() {
  const { roomId, hotelId, baseRate, arrival, departure } = useParams();
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());
  const [numChildren, setNumChildren] = useState(0);
  const [numAdults, setNumAdults] = useState(0);

  const navigate = useNavigate();
  let guest = sessionStorage.getItem("guest");
  useEffect(() => {
    if (guest === null || guest === "") {
      navigate("/glogin");
    }
  }, []);
  console.log(guest);
  console.log(baseRate);

  async function Reserve(){
    let result = await fetch (BASEPATH + "reservations",{
        method:"POST",
        body:JSON.stringify({
            guestEmail:guest,
            roomNumber:roomId,
            hotelId:hotelId,
            arrivalDate:arrival,
            departureDate:departure,
            rate:baseRate,
            children:numChildren,
            adults:numAdults,
            reservationStatusID:1
            //add reservationstatus later
        }),headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
    result = await result.json();
  }
  return (
    <>
<Navbar/>
    <form>
      <h1>This is Reservation</h1>
      <label>Email</label>
      <input type="text" value={guest} readOnly />
      <label>Room Number</label>
      <input type="text" value={roomId} readOnly />
      <label>Arrival Date: </label>
      <input type="text" value={arrival} readOnly />
      <label>Departure Date: </label>
      <input type="text" value={departure} readOnly />
      <label>Rate</label>
      <input type="text" value={baseRate} readOnly />
      <label>Number of children:</label>
      <input type="text" onChange={(e)=>setNumChildren(e.target.value)} value={numChildren}/>
      <label>Number of Adults:</label>
      <input type="text" onChange={(e)=>setNumAdults(e.target.value)} value={numAdults}/>
      <button onClick={Reserve}>Make Reservation</button>
      <Link
              to={`/moreDetails/${hotelId}/${arrival}/${departure}`}
            >
              <button className="cancel">Cancel</button>
            </Link>
    </form>
    </>
  );
}
export default Reservation;
