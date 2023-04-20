import Navbar from "./Navbar";
import TopBar from "./TopBar";
import {InHouseList} from "./component/reservations";

export default function InHouse() {
  return (
    <div className="container">
      <TopBar />
        <Navbar />
      <div className="staff">
        <InHouseList/>
      </div>
    </div>
  );
}