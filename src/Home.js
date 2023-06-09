import Navbar from "./Guest/Navbar";
import HomeCarousel from "./Components/Carousel";
import Map from "./Components/Map";
import Provinces from "./Components/province";
import Calendars from "./Components/Calendar";
import About from "./Components/about";
import { BASEPATH, COMPANY } from "./config";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./Components/footer";
import { mindShare } from "fontawesome";

function Home() {
  const [arrivalDate, setArrivalDate] = useState(new Date(new Date().getTime()).toISOString().slice(0, 10));
  const [departureDate, setDepartureDate] = useState(new Date(new Date().getTime() + 86400000).toISOString().slice(0, 10));
  const [availableHotels, setAvailableHotels] = useState([]);
  const [province, setProvince] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  //the first time the page loads -> no queries
  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(BASEPATH + `hotels`);
      const data = await resp.json();
      setAvailableHotels(data);
      const prices = data.map(hotel => hotel.Price);
      const min = Math.min(...prices)
      const max = Math.min(...prices)
      setMinPrice(min);
      setMaxPrice(max);
      sessionStorage.removeItem("admin");
    }
    fetchData();
  }, []);
  const handleAvailabilityCheck = async () => {
    if (arrivalDate === null) {
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
      <Navbar/>
      <HomeCarousel />
      <div className="selectors">
        <div>
          <Provinces setProv={setProvince} />
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
        <i class="fa-solid fa-magnifying-glass"/>
        </button>
      </div>
      <div className="body">
      <Map />
      <div className="hotels">
  {availableHotels.map((hotel) => {
    const minPrice = Math.min(...hotel.Rooms.map((room) => room.BaseRate));
    return (
      <div key={hotel.Id} className="hotel-container">
        <img
          src={`data:image/png;base64,${hotel.Image}`}
          alt={hotel.Name}
          onError={(e) => console.log("Failed to load image", e)}
        />
        <h2>{hotel.Name}</h2>
        <p>City: {hotel.City}</p>
        <p>Province: {hotel.Province}</p>
        <p>Description: {hotel.Description}</p>
        <p>From: ${minPrice}</p>
        <Link to={`/moreDetails/${hotel.Id}/${arrivalDate}/${departureDate}`}>
          <button>More Details</button>
        </Link>
      </div>
    );
  })}
</div>
      <h2>About {COMPANY}</h2>
      <section className="about">
      <About
        title={COMPANY + " global hotel search"}
        content={
          COMPANY +
          " hotel search allows users to compare hotel prices in just a few clicks from hundreds of booking sites for more than 5.0 million hotels and other types of accommodation in over 190 countries. We help millions of travelers each year compare deals for hotels and accommodations. Get information for weekend trips to cities like Toronto or Vancouver and you can find the right hotel on trivago quickly and easily. Montreal and its surrounding area are great for trips that are a week or longer with the numerous hotels available."
        }
      /> <About
        title={COMPANY + " global hotel search"}
        content={
          COMPANY +
          " hotel search allows users to compare hotel prices in just a few clicks from hundreds of booking sites for more than 5.0 million hotels and other types of accommodation in over 190 countries. We help millions of travelers each year compare deals for hotels and accommodations. Get information for weekend trips to cities like Toronto or Vancouver and you can find the right hotel on trivago quickly and easily. Montreal and its surrounding area are great for trips that are a week or longer with the numerous hotels available."
        }
      /> <About
        title={COMPANY + " global hotel search"}
        content={
          COMPANY +
          " hotel search allows users to compare hotel prices in just a few clicks from hundreds of booking sites for more than 5.0 million hotels and other types of accommodation in over 190 countries. We help millions of travelers each year compare deals for hotels and accommodations. Get information for weekend trips to cities like Toronto or Vancouver and you can find the right hotel on trivago quickly and easily. Montreal and its surrounding area are great for trips that are a week or longer with the numerous hotels available."
        }
      /> <About
        title={COMPANY + " global hotel search"}
        content={
          COMPANY +
          " hotel search allows users to compare hotel prices in just a few clicks from hundreds of booking sites for more than 5.0 million hotels and other types of accommodation in over 190 countries. We help millions of travelers each year compare deals for hotels and accommodations. Get information for weekend trips to cities like Toronto or Vancouver and you can find the right hotel on trivago quickly and easily. Montreal and its surrounding area are great for trips that are a week or longer with the numerous hotels available."
        }
      />
      </section>
     
      </div>
      <Footer/>
    </>
  );
}

export default Home;
