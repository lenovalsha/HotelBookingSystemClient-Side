import Navbar from "./Navbar";
import TopBar from "./TopBar";
import Overview from "../Admin/components/overview";

export default function StaffDashboard() {
  return (
    <div className="container">
      <TopBar />
        <Navbar />
      <div className="staff">
        <Overview/>
      </div>
    </div>
  );
}
