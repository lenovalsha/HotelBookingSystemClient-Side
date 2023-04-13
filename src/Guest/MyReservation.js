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
      <h1>This is reservation</h1>
      <h1>{email}</h1>
      {()=>{if(myreservation.count > 0)
      {
      myreservation.map((e) => (
        <div>
          <h1>{e.RoomNumber}</h1>
        </div>
      ))
      }
      }}
    </div>
  );
}
