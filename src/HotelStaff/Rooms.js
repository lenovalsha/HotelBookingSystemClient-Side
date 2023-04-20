import Navbar from "./Navbar";
import TopBar from "./TopBar";
import { ShowRooms } from "../Admin/components/room";
export default function Rooms(){
    return(
        <div className="container">
      <TopBar />
        <Navbar />
        <div className="staff">

        <ShowRooms/>
        </div>
      
    </div>
    )
}