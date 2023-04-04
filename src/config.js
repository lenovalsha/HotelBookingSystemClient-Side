import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const BASEPATH = "https://localhost:7285/api/";
export const ADMIN = sessionStorage.getItem("admin");

export const GetHotelByAdmin = (props) =>{
    alert("!")
    useEffect(() => {
        const fetchData = async () => {
          const resp = await fetch(BASEPATH + "hotels/adminusername/" + ADMIN);
          if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
        }
            const data = await resp.json();
            props.setHotel(data);
            sessionStorage.setItem("hotelId",1);
            console.log(props.hotel);
    };
    fetchData();
}, []);
}
export async function GetRoomsByHotelId() {
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