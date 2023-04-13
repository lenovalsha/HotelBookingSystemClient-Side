import { BASEPATH } from "../config";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Calendars from "./Calendar";

import Navbar from "../Guest/Navbar";
//show rooms available
//maybe show a calendar?
function MoreDetails(props) {
  const { Id,arrDate,depDate } = useParams();
  const [roomList, setRoomList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [arrivalDate, setArrivalDate] = useState(new Date().toISOString().split("T"[0]));
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split("T"[0]));
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(
        BASEPATH +
          `rooms/hotelId/${Id}/arrivaldate/${arrDate}/departuredate/${depDate}`
      );
      const data = await resp.json();
      setAvailableRooms(data);
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
    console.log(arrivalDate);
    const resp = await fetch(
      BASEPATH +
        `rooms/hotelId/${Id}/arrivaldate/${arrivalDate}/departuredate/${departureDate}`
    );
    const data = await resp.json();
    setAvailableRooms(data);
  };
  return (
    <>
      <Navbar />
      <div className="selectors">
      <Calendars
          date={arrivalDate}
          setDate={setArrivalDate}
          label="Arrival Date:"
        />
        <Calendars
          date={departureDate}
          setDate={setDepartureDate}
          label="Departure Date:"
        />
        <button className="search" onClick={handleAvailabilityCheck}>Search</button>
      </div>
      <h1>{Id}</h1>
      <div>
        <h1>AVAILABLE ROOMS</h1>
        {availableRooms.map((r) => (
          <div className="per-detail">
            <div>
              <Carousel
                autoPlay={true}
                infiniteLoop
                showArrows={false}
                showThumbs={false}
              >
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
              <Link
                to={`/reservations/${r.HotelId}/${r.RoomNumber}/${
                  r.BaseRate
                }/${arrivalDate}/${departureDate}`}
              >
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
