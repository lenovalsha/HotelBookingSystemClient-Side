import { useEffect, useState } from "react";
import { BASEPATH } from "../../config";

export default function CheckingIn({onClose}){

    const [reservation,setReservation] = useState([]);

    //get the reservation for specific Id
    let ID = sessionStorage.getItem("reservationId");
    useEffect(()=>{
        const fetchData = async() =>{
            const resp = await fetch(BASEPATH + "reservations/" +ID);
            const Data = await resp.json();
            setReservation(Data);

        }
        fetchData();
    },)

    //Check In ->  change the reservation status to inhouse
    async function Checkin(data){
        const updatedReservation = {...data,reservationStatusId: 2};
        setReservation(updatedReservation);
        const resp = await fetch(BASEPATH + "reservations/" + ID,
        {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedReservation),
        })
        try {
            const newData = await resp.json();
            setReservation(newData);
            console.log(newData);
          } catch (error) {
            console.error(error);
          }
    }

    return(<div>
    <button className="close" onClick={onClose}>X</button>
    {reservation.map((x)=>(
    <div key={x.Id}>
    <input type="text" readOnly value={x.Id}/>
    <label>First Name:</label>
    <input type="text" readOnly value={x.Guest.FirstName}/>
    <label>Last Name:</label>
    <input type="text" readOnly value={x.Guest.LastName}/>
    <label>Email:</label>
    <input type="text" readOnly value={x.GuestEmail}/>
    <label>Room Number:</label>
    <input type="text" readOnly value={x.RoomNumber}/>
    <label>Check-in Date:</label>
    <input type="text" readOnly value={x.ArrivalDate}/>
    <label>Check Out Date:</label>
    <input type="text" readOnly value={x.DepartureDate}/>
    <label>Number of Adults:</label>
    <input type="text" readOnly value={x.Adults}/>
    <label>Number of Children:</label>
    <input type="text" readOnly value={x.Children}/>
    <button onClick={() => Checkin(x)}>Check-In</button>
    </div>
    ))}




    </div>)
}