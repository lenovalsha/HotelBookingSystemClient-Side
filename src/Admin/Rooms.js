//this should dispaly all of the rooms associated with this hotel

import { useEffect, useState } from "react";
import { BASEPATH } from "../config";

//you should be able to add a room
function Rooms() {
  const [roomList, setRoomList] = useState([]);
  let admin = sessionStorage.getItem("admin");
  //get the rooms
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(BASEPATH + "adminusername/" + admin);
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const data = await resp.json();
      setRoomList(data);
      console.log(roomList);
    };
    fetchData();
  }, []);

  return(<div>
    
  </div>
  )
}
export default Rooms;
