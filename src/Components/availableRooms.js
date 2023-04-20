import { BASEPATH } from "../config";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Calendars from "./Calendar";
import Footer from "./footer";
import WalkInReservation from "../HotelStaff/component/walkin";

//show rooms available
function AvailableRooms(props) {
  const [imageList, setImageList] = useState([]);
  const [arrivalDate, setArrivalDate] = useState(new Date(new Date().getTime()).toISOString().slice(0, 10));
  const [departureDate, setDepartureDate] = useState(new Date(new Date().getTime() + 86400000).toISOString().slice(0, 10));
  const [availableRooms, setAvailableRooms] = useState([]);
  const staff = sessionStorage.getItem("admin");
  console.log(staff);
  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(
        BASEPATH +
          `rooms/hotelId/${props.Id}/arrivaldate/${props.arrDate}/departuredate/${props.depDate}`
      );
      const data = await resp.json();
      setAvailableRooms(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchImages() {
      const resp = await fetch(BASEPATH + `roomImages/hotelId/${props.Id}`);
      const images = await resp.json();
      setImageList(images);
    }
    fetchImages();
  }, []);

  const handleAvailabilityCheck = async () => {
    console.log(arrivalDate);
    const resp = await fetch(
      BASEPATH +
        `rooms/hotelId/${props.Id}/arrivaldate/${arrivalDate}/departuredate/${departureDate}`
    );
    const data = await resp.json();
    setAvailableRooms(data);
  };
  return (
    <div className="staff-overview">
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
        <button className="search" onClick={handleAvailabilityCheck}>
        <i class="fa-solid fa-magnifying-glass"/>
        </button>
      </div>
      {/* show all available rooms */}
      <div className="body">
        <h1>AVAILABLE ROOMS: {availableRooms.length}</h1>
        {availableRooms.map((r) => (
          <div className="per-detail">
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
                    />
                  </div>
                ))}
            </Carousel>
            <div className="info">
              <p>Type: {r.RoomTypeName || "Unknown"}</p>
              <p>Floor: {r.Floor}</p>
              <p>Room: {r.RoomNumber}</p>
              <p>Number of Beds: {r.NumOfBeds}</p>
              <p>Description:{r.Description}</p>
              <p>From: ${r.BaseRate}</p>
            </div>
            <div>
              {staff !== null ? (
                <Link
                  to={`/walkinreservation/${r.HotelId}/${r.RoomNumber}/${r.BaseRate}/${arrivalDate}/${departureDate}`}
                >
                  <button>Reserve this room - Staff</button>
                  
                </Link>
              ) : (
                <Link
                  to={`/reservations/${r.HotelId}/${r.RoomNumber}/${r.BaseRate}/${arrivalDate}/${departureDate}`}
                >
                  <button>Reserve this room</button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableRooms;
