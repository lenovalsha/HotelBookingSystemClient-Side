import { BASEPATH } from "../config";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-calendar/dist/Calendar.css';

import Navbar from "./Navbar";
//show rooms available
//maybe show a calendar?
function MoreDetails() {
  const { Id } = useParams();
  const [roomList, setRoomList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [arrivalDate, setArrivalDate] = useState(new Date())
  const [departureDate, setDepartureDate] = useState(new Date())
  const [availableRooms,setAvailableRooms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(
        BASEPATH + "rooms/hotelId/" + Id + "?include=roomtype"
      );
      const data = await resp.json();
      //get a list of images per room
      setRoomList(data);
    }
    fetchData();
  }, [Id]);
  useEffect(() => {
    async function fetchImages() {
      const resp = await fetch(BASEPATH + `roomImages/hotelId/${Id}`);
      const images = await resp.json();
      setImageList(images);
    }
    fetchImages();
  }, [Id]);

  const handleAvailabilityCheck = async () => {
    const resp = await fetch(
      BASEPATH + `rooms/hotelId/${Id}/arrivaldate/${arrivalDate.toISOString()}/departuredate/${departureDate.toISOString()}`
    );
    const data = await resp.json();
    setAvailableRooms(data);
  }
  return (
    <>
    <Navbar/>
    <div className="calendars">
    <div>
      <label>Arrival Date: </label>
      <Calendar onChange={setArrivalDate} value={arrivalDate}/>

    </div>
    <div>
      <label>Departing Date: </label>
      <Calendar onChange={setDepartureDate} value={departureDate} style={{ width: '500px', height: '500px' }}/>
    </div>
      <button onClick={handleAvailabilityCheck}>Check Availability</button>
    </div>
    <div>
    <h1>AVAILABLE ROOMS</h1>
    {availableRooms.map((r) => (
      <div className="per-detail">
        <div>
          <Carousel autoPlay={true} infiniteLoop showArrows={false}  showThumbs={false}>
            {imageList
              .filter((i) => i.RoomNumber === r.RoomNumber)
              .map((img) => (
                <div>
                  {console.log("This is roomnumber" + img.RoomNumber)}
                  <img
                    key={img.Id}
                    src={`data:image/png;base64, ${img.Image}`}
                    alt={img.altText}
                     style={{ height: "300px", objectFit: "contain" }}
                  />
                </div>
              ))}
          </Carousel>
        <p>Room: {r.RoomNumber}</p>
        <p>Type: {r.RoomTypeName || "Unknown"}</p>
        <p>Floor: {r.Floor}</p>
        <p>Room: {r.RoomNumber}</p>
        <p>Base Rate:{r.BaseRate}</p>
        <Link to={`/reservations/${r.HotelId}/${r.RoomNumber}/${r.BaseRate}/${arrivalDate.toISOString()}/${departureDate.toISOString()}`}>
        <button>Reserve this room</button>
        </Link>
        </div>
        </div>
    ))}
    </div>
  </>
);
}

export default MoreDetails;
