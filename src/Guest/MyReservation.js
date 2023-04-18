import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { BASEPATH } from "../config";
import { useNavigate } from "react-router-dom";
export default function MyReservation() {
  let email = sessionStorage.getItem("guest");
  const [myreservation, setMyReservationList] = useState();
  const navigate = useNavigate();
  if (email === null) {
    navigate("/glogin")
  }
  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(BASEPATH + "reservations/guestemail/" + email);
      const data = await resp.json();
      //get a list of images per room
      setMyReservationList(data);
    }
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <h1>My Reservations</h1>
      {myreservation?.length > 0 && (
      myreservation.map((e) => (
        <div className="reservations">
          <h1>{e.Hotel.Name}</h1>
          <p>Room Number: {e.RoomNumber}</p>
          <p>Arrival Date: {e.ArrivalDate}</p>
          <p>Departure Date: {e.DepartureDate}</p>
          <p>Rate:${e.Rate}</p>
        </div>
      ))
    )}
    </div>
  );
}
