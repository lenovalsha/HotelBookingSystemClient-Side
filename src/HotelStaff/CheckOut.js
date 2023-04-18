import Navbar from "./Navbar";
import TopBar from "./TopBar";
import {Departing} from "./component/reservations";

export default function CheckingOut() {
  return (
    <div className="container">
      <TopBar />
        <Navbar />
      <div className="staff">
        <Departing/>
      </div>
    </div>
  );
}