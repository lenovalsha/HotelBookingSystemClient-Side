import { ad } from "fontawesome";
import { useEffect, useState } from "react";
import { BASEPATH } from "../../config";
import { useParams,Link } from "react-router-dom";
import Navbar from "../Navbar";
import TopBar from "../TopBar";


export default function WalkInReservation(){
    const { roomId, hotelId, baseRate, arrival, departure } = useParams();
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [address,setAddress] = useState("");
    const [postal,setPostal] = useState("");
    const [city,setCity] = useState("");
    const [phone,setPhone] = useState("");
    const [email,setEmail] = useState("");
    const [numChildren,setNumChildren] = useState("");
    const [numAdults,setNumAdults] = useState("");
    const [reservationstatus,setReservationStatus]=useState();
    const [reservationstatusList,setReservationStatusList] =useState([]);
    //get the list of reservation status
  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(
        BASEPATH + "reservationstatus"
      );
      const data = await resp.json();
      //get a list of images per room
      setReservationStatusList(data);
    }
    fetchData();
  }, []);
    async function Reserve(){
        let result = await fetch (BASEPATH + "reservations",{
            method:"POST",
            body:JSON.stringify({
                email:email,
                firstName:firstName,
                lastName:lastName,
                address: address,
                city: city,
                phone: phone,
                roomNumber:roomId,
                hotelId:hotelId,
                arrivalDate:arrival,
                departureDate:departure,
                rate:baseRate,
                children:numChildren,
                adults:numAdults,
                reservationStatusID: reservationstatus
                //add reservationstatus later
            }),headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        result = await result.json();
      }

    return( <div className="container">
    <TopBar />
    <div className="staff">
      <Navbar />
    <div className="form">
    <label>First Name:</label>
    <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
    <label>Last Name:</label>
    <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
    <label>Email:</label>
    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <label>Address:</label>
    <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)}/>
    <label>City:</label>
    <input type="text" value={city} onChange={(e)=>setCity(e.target.value)}/>
    <label>Postal:</label>
    <input type="text" value={postal} onChange={(e)=>setPostal(e.target.value)}/>
    <label>Phone:</label>
    <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
    <label>Room Number:</label>
    <input type="text" value={roomId}/>
    <label>Check-in Date:</label>
    <input type="text" readOnly value={arrival}/>
    <label>Check Out Date:</label>
    <input type="text" readOnly value={departure}/>
    <label>Number of Adults:</label>
    <input type="text"value={numAdults} onChange={(e)=>setNumAdults(e.target.value)}/>
    <label>Number of Children:</label>
    <input type="text" value={numChildren} onChange={(e)=>setNumChildren(e.target.value)}/>
    <label>Base Rate:</label>
    <input type="text"  value={baseRate} readOnly/>
    <select onChange={(e) => setReservationStatus(e.target.value)}>
        {reservationstatusList.map((x)=>(
            <option value={x.Id} key={x.Id}>
            {x.Name}
            </option>
        ))}
    </select>
    <div className="buttons">

    <Link to="/walkin"><button>Cancel</button></Link>
    <button onClick={Reserve}>Submit</button>

    </div>
    </div>



  </div>

    </div>)
}