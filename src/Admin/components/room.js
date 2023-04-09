import { useState, useEffect } from "react";
import { BASEPATH } from "../../config";
import Images from "./images";
function Room() {
  //variables
  const [floor, setFloor] = useState();
  const [roomNumber, setRoomNumber] = useState();
  const [description, setDescription] = useState("");
  const [roomStatusId, setRoomStatusId] = useState();
  const [roomTypeName, setRoomTypeName] = useState();
  const [baseRate, setBaseRate] = useState();
  //lists
  const [roomStatusList, setRoomStatusList] = useState([]);
  const [roomTypeList, setRoomTypeList] = useState([]);
  //sessionstorage
  let hotelId = sessionStorage.getItem("hotelId");

  //fetch the list
  useEffect(() => {
    //get the status list data
    const fetchData = async () => {
      const resp = await fetch(BASEPATH + "roomstatus/");
      const newData = await resp.json();
      setRoomStatusList(newData); //save the list of newDate to the list
      console.log(newData);
    };
    fetchData();
  }, []);
  useEffect(() => {
    //get the status list data
    const fetchData = async () => {
      const resp = await fetch(BASEPATH + "roomtypes/");
      const newData = await resp.json();
      setRoomTypeList(newData); //save the list of newDate to the list
      console.log(newData);
    };
    fetchData();
  }, []);
  async function AddRoom() {
    const selectedRoomType = roomTypeList.find((p) => p.Name === roomTypeName);
    const selectedRoomStatus = roomStatusList.find(
      (p) => p.Id === roomStatusId
    );

    if (!selectedRoomType || !selectedRoomStatus) {
      alert("Please select a room type/ status");
    }
    let result = await fetch(BASEPATH + "rooms/", {
      method: "POST",
      body: JSON.stringify({
        hotelId: hotelId,
        floor: floor,
        roomNumber: roomNumber,
        description: description,
        roomStatusId: roomStatusId,
        roomTypeName: roomTypeName,
        baseRate: baseRate,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    sessionStorage.setItem("roomId",result.Id);
  }
  return (
    <div>
      <label>Hotel Id</label>
      <input value={hotelId} type="text" />
      <label>Floor Number</label>
      <input
        value={floor}
        onChange={(e) => setFloor(e.target.value)}
        type="text"
      />
      <label>Room Number</label>
      <input
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
        type="text"
      />
      <label>Description</label>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
      />
      <label>Base Rate</label>
      <input
        value={baseRate}
        onChange={(e) => setBaseRate(e.target.value)}
        type="text"
      />

      <select onChange={(e) => setRoomStatusId(e.target.value)}>
        {
          //loop through the list and add it as option
          roomStatusList.map((prio) => (
            <option value={prio.Id} key={prio.Id}>
              {prio.Name}
            </option>
          ))
        }
      </select>
      <select onChange={(e) => setRoomTypeName(e.target.value)}>
        {
          //loop through the list and add it as option
          roomTypeList.map((prio) => (
            <option value={prio.Name} key={prio.Id}>
              {prio.Name}
            </option>
          ))
        }
      </select>
      <button onClick={AddRoom}>Register Room</button>
      <Images roomId = {sessionStorage.getItem("roomId")}/>
    </div>
  );
}

export default Room;
