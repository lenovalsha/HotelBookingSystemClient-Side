import { useState, useEffect } from "react";
import { BASEPATH } from "../config";
import { Link } from "react-router-dom";

function Hotels() {
    const [hotelList, setHotelList] = useState([]);
  

    useEffect(() => {
        async function fetchData() {
          const resp = await fetch(BASEPATH + "hotels");
          const data = await resp.json();
          setHotelList(data);
        }
        fetchData();
      }, []);
    return (
      <div>
        <h1>Hotels</h1>
        {hotelList.map((hotel) => (
          <div key={hotel.Id}>
            <h1>{hotel.Name}</h1>
            <img
              src={`data:image/png;base64,${hotel.Image}`}
              alt={hotel.Name}
              onError={(e) => console.log("Failed to load image", e)}
            />
            <Link to={`/moreDetails/${hotel.Id}`}>
            <button>More Details</button>
          </Link>
          </div>
        ))}
      </div>
    );
  }
  export default Hotels;