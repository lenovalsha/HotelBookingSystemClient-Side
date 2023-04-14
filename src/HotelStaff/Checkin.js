import Navbar from "./Navbar";
import TopBar from "./TopBar";
import Overview from "../Admin/components/overview";
import Arriving from "./component/reservations";

export default function CheckIn() {
  return (
    <div className="container">
      <TopBar />
      <div className="staff">
        <Navbar />
        <Arriving/>
      </div>
    </div>
  );
}