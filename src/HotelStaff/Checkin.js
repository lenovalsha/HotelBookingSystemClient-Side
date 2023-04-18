import Navbar from "./Navbar";
import TopBar from "./TopBar";
import Arriving from "./component/reservations";

export default function CheckIn() {
  return (
    <div className="container">
      <TopBar />
        <Navbar />
      <div className="staff">
        <Arriving/>
      </div>
    </div>
  );
}