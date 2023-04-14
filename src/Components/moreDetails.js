import { BASEPATH } from "../config";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AvailableRooms from "./availableRooms";
import Footer from "./footer";

import Navbar from "../Guest/Navbar";
//show rooms available
function MoreDetails() {
  const { Id,arrDate,depDate } = useParams();
  let guest= sessionStorage.getItem("guest");
  console.log(guest)
  
  return (
    <>
      <Navbar />
      <AvailableRooms Id={Id} arrDate={arrDate} depDate={depDate}/> 
      <Footer/>
    </>
  );
}

export default MoreDetails;
