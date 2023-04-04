//this should include dashboard, Rooms, 
import Rooms from "./Rooms";

function Panel(){
    let hotelId = sessionStorage.getItem("hotelId");
    console.log("This is the hotelId:" +  hotelId);
    return(<>
    <h1>This is panel</h1>
        {/* <Rooms/> */}
    </>)
}
export default Panel;