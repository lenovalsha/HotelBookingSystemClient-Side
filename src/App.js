
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Hotel from './Admin/components/Hotel';
import Login from './Admin/Login';
import Home from './Home';
import Dashboard from './Admin/Dashboard';
import MoreDetails from './Components/moreDetails';
import Reservation from './Guest/Reservation';
import Glogin from './Guest/Login';
import  GRegister  from './Guest/Register';
import Settings from './Components/Settings';
import Application from './Application';
import StaffRegister,{ StaffLogin,StaffList } from './Admin/components/staff';
import AdminRooms from './Admin/Rooms';
import MyReservation from './Guest/MyReservation';
import StaffDashboard from './HotelStaff/Dashboard';
import CheckIn from './HotelStaff/Checkin';
import CheckingOut from './HotelStaff/CheckOut';
import WalkIn from './HotelStaff/WalkIn';
import WalkInReservation from './HotelStaff/component/walkin';
import Rooms from './HotelStaff/Rooms';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        {/* ADMIN */}
          <Route path='/applications' element={<Application/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/adminlogin' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/hotel' element={<Hotel/>}/>
          <Route path='/adminrooms' element={<AdminRooms/>}/>
          {/* STAFF */}
          <Route path='/slogin' element={<StaffLogin/>}/>
          <Route path='/sregister' element={<StaffRegister/>}/>
          <Route path='/staffs' element={<StaffList/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/sdashboard' element={<StaffDashboard/>}/>
          <Route path='/checkin' element={<CheckIn/>}/>
          <Route path='/checkout' element={<CheckingOut/>}/>

          <Route path='/walkin' element={<WalkIn/>}/>
          <Route path='/showrooms' element={<Rooms/>}/>

          <Route path='/walkinreservation/:hotelId/:roomId/:baseRate/:arrival/:departure'element={<WalkInReservation/>}/>



          {/* GUEST */}
          <Route path='/glogin' element={<Glogin/>}/>
          <Route path='/gRegister' element={<GRegister/>}/>
          <Route path='/moreDetails/:Id/:arrDate/:depDate'element={<MoreDetails/>}/>
          <Route path='/reservations/:hotelId/:roomId/:baseRate/:arrival/:departure'element={<Reservation/>}/>

          <Route path='/searchRooms'element={<MoreDetails/>}/>
          <Route path='/myreservations'element={<MyReservation/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
