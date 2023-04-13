import Navbar from "./Guest/Navbar";
import HomeCarousel from "./Components/Carousel";
import Map from "./Components/Map";
import Provinces from "./Components/province";
import Calendars from "./Components/Calendar";
import { BASEPATH } from "./config";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
function Home() {
  const [arrivalDate, setArrivalDate] = useState(new Date().toISOString().split("T"[0]));
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split("T"[0]));
  const [availableHotels, setAvailableHotels] = useState([]);
  const [province, setProvince] = useState("");

  //the first time the page loads -> no queries
  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(
        BASEPATH +
        `hotels`
      );
      const data = await resp.json();
      setAvailableHotels(data);
    }
    fetchData();
  }, []);
  const handleAvailabilityCheck = async () => {
    if(arrivalDate === null )
    {
        console.log("empty");
    }
    const resp = await fetch(
      BASEPATH +
        `hotels/arrivaldate/${arrivalDate}/departuredate/${departureDate}/province/${province}`
    );
    const data = await resp.json();
    setAvailableHotels(data);
    
  };
  return (
    <>
      <Navbar />
      <div className="selectors">
        <div>
          <Provinces setProv={setProvince}/>
        </div>
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
          Search
        </button>
      </div>
      <HomeCarousel />
      <Map />
      {/* <Hotel/> */}
      
        <div className="hotels">
          {availableHotels.map((hotel) => (
            <div key={hotel.Id}>
              <h1>{hotel.Name}</h1>
              <img
                src={`data:image/png;base64,${hotel.Image}`}
                alt={hotel.Name}
                onError={(e) => console.log("Failed to load image", e)}
              />
              <Link to={`/moreDetails/${hotel.Id}/${arrivalDate}/${departureDate}`}>
                <button>More Details</button>
              </Link>
            </div>
          ))}
        </div>
    </>
  );
}

export default Home;
