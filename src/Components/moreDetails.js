import { BASEPATH } from "../config";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
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
    <div>
    <div className="calendars">
      <label>Arrival Date: </label>
      <Calendar onChange={setArrivalDate} value={arrivalDate}/>
      <label>Departing Date: </label>
      <Calendar onChange={setDepartureDate} value={departureDate}/>
      <button onClick={handleAvailabilityCheck}>Check Availability</button>
    </div>
    <h1>This is more details page</h1>
    <h1>{Id}</h1>
    {roomList.map((r) => (
      <div className="per-detail">
        <h2>Type:{r.RoomTypeName || "Unknown"}</h2>
        <p>Floor: {r.Floor}</p>
        <p>Room: {r.RoomNumber}</p>
        <p>Base Rate:{r.BaseRate}</p>
        <div className="images">
          <Carousel infiniteLoop  className="carousel-wrapper">
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
    <h2>Available Rooms:</h2>
    {availableRooms.map((r) => (
      <div className="per-detail">
        <p>Room: {r.RoomNumber}</p>
        <p>Type: {r.RoomTypeName || "Unknown"}</p>
        <p>Floor: {r.Floor}</p>
        <p>Room: {r.RoomNumber}</p>
        <p>Base Rate:{r.BaseRate}</p>
        <div className="images">
          <Carousel infiniteLoop  className="carousel-wrapper">
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
        <Link to={`/reservations/${r.HotelId}/${r.RoomNumber}/${r.BaseRate}/${arrivalDate.toISOString()}/${departureDate.toISOString()}`}>
        <button>Reserve this room</button>
        </Link>
      </div>
    ))}
  </div>
);
}

export default MoreDetails;
