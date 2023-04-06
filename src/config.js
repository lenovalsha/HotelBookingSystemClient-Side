import { useEffect, useState } from "react";
export const BASEPATH = "https://localhost:7285/api/";


async function GetRoomsByHotelId() {
  const [roomList, setRoomList] = useState([]);
  let admin = sessionStorage.getItem("admin");
  //get the rooms
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(BASEPATH + "/rooms/hotelId/" + admin);
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const data = await resp.json();
      setRoomList(data);
      console.log(roomList);
    };
    fetchData();
  }, []);
}