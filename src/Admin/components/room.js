import { useState, useEffect } from "react";
import { BASEPATH } from "../../config";
import Images from "./images";
import { useParams, Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../Navbar";
export default function AddRoom({onClose}) {
  //variables
  const [floor, setFloor] = useState();
  const [roomNumber, setRoomNumber] = useState();
  const [description, setDescription] = useState("");
  const [roomStatusId, setRoomStatusId] = useState();
  const [roomTypeName, setRoomTypeName] = useState();
  const [baseRate, setBaseRate] = useState();
  const [numOfBeds, setNumOfBeds] = useState();

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
        numOfBeds:numOfBeds
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
    <div className="flex-column">
      <label>Hotel Id</label>
      <input value={hotelId} type="text" />
      <label>Floor Number</label>
      <input
        value={floor}
        onChange={(e) => setFloor(e.target.value)}
        type="number"
        required
      />
      <label>Room Number</label>
      <input
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
        type="number"
        required
      />
      <label>Number of beds</label>
      <input
        value={numOfBeds}
        onChange={(e) => setNumOfBeds(e.target.value)}
        type="number"
        required
      />
      <label>Description</label>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        required
      />
      <label>Base Rate</label>
      <input
        value={baseRate}
        onChange={(e) => setBaseRate(e.target.value)}
        type="number"
        required
      />

      <select onChange={(e) => setRoomStatusId(e.target.value)}>
          <option value={""} key={0}></option>
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
     <option value={""} key={0}></option>

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
      <button className="delete" onClick={onClose}>X</button>
      <Images roomId = {sessionStorage.getItem("roomId")}/>
    </div>
  );
}
export function ShowRooms() {
  const { Id } = useParams();
  let HOTELID = sessionStorage.getItem("hotelId");
  const [roomList, setRoomList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [showRoom, setShowRoom] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(
        BASEPATH + "rooms/hotelId/" + HOTELID 
      );
      const data = await resp.json();
      //get a list of images per room
      setRoomList(data);
    }
    fetchData();
  }, [Id]);
  useEffect(() => {
    async function fetchImages() {
      const resp = await fetch(BASEPATH + `roomImages/hotelId/${HOTELID}`);
      const images = await resp.json();
      setImageList(images);
    }
    fetchImages();
  }, [Id]);
  return (
    <div className="overflow">
    <h1>All Rooms</h1>
    <button
            onClick={() =>
              {setShowRoom(true)}
            }
            disabled={false}
          >
            Add A Room
          </button>
          {showRoom && (
        <AddRoom onClose={()=>{setShowRoom(false)}}/>
      )}
    {roomList.map((r) => (
      <div className="rooms">
        <h2>Type:{r.RoomTypeName || "Unknown"}</h2>
        <p>Floor: {r.Floor}</p>
        <p>Room: {r.RoomNumber}</p>
        <p>Base Rate:{r.BaseRate}</p>
        <div className="images">
          <Carousel infiniteLoop  className="carousel-wrapper" showArrows={false}
              showThumbs={false}>
            {imageList
              .filter((i) => i.RoomNumber === r.RoomNumber)
              .map((img) => (
                <div>
                  {console.log("This is roomnumber" + img.RoomNumber)}
                  <h1>{img.id}</h1>
                  <img
                    key={img.Id}
                    src={`data:image/png;base64, ${img.Image}`}
                    alt={img.altText}
                  />
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    ))}
  </div>
);
              }