
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Hotel from './Admin/components/Hotel';
import Login from './Admin/Login';
import Panel from './Admin/Panel';
import Home from './Home';
import Dashboard from './Admin/Dashboard';
import MoreDetails from './Components/moreDetails';
import Reservation from './Guest/Reservation';
import Glogin from './Guest/Login';
import  GRegister  from './Guest/Register';
import Settings from './Components/Settings';
import Application from './Application';
import StaffRegister,{ StaffLogin,StaffList } from './Admin/components/staff';
import { ShowRooms } from './Admin/components/room';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/adminlogin' element={<Login/>}/>
          <Route path='/hotel' element={<Hotel/>}/>
          <Route path='/panel' element={<Panel/>}/>
          <Route path='/applications' element={<Application/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/glogin' element={<Glogin/>}/>
          <Route path='/gRegister' element={<GRegister/>}/>
          <Route path='/slogin' element={<StaffLogin/>}/>
          <Route path='/sregister' element={<StaffRegister/>}/>
          <Route path='/staffs' element={<StaffList/>}/>
          <Route path='/rooms' element={<ShowRooms/>}/>
          <Route path='/moreDetails/:Id'element={<MoreDetails/>}/>
          <Route path='/reservations/:hotelId/:roomId/:baseRate/:arrival/:departure'element={<Reservation/>}/>
          <Route path='/searchRooms'element={<MoreDetails/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
