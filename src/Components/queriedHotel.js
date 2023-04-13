export default function QueriedHotel(props){
    //get hotels based on their province
    //get hotels that have available rooms for certain dates
    const handleAvailabilityCheck = async () => {
        const resp = await fetch(
          BASEPATH + `rooms/hotelId/${Id}/arrivaldate/${props.arrivalDate.toISOString()}/departuredate/${props.departureDate.toISOString()}`
        );
        const data = await resp.json();
        props.setAvailableHotels(data);
      }
    //return one instance of that hotel
    return(
        <div>
            
        </div>
    )
}