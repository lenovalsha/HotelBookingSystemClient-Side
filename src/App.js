
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Hotel from './Admin/components/Hotel';
import Login from './Admin/Login';
import Panel from './Admin/Panel';
import Home from './Home';
import Dashboard from './Admin/Dashboard';
import MoreDetails from './Components/moreDetails';
import Reservation from './Guest/Reservation';
import Glogin from './Guest/Login';
import { Register } from './Guest/Register';
import Settings from './Components/Settings';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/register' element={<Login/>}/>
          <Route path='/hotel' element={<Hotel/>}/>
          <Route path='/panel' element={<Panel/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/guestregister' element={<Register/>}/>
          <Route path='/guestlogin' element={<Glogin/>}/>
          <Route path='/moreDetails/:Id'element={<MoreDetails/>}/>
          <Route path='/reservations/:hotelId/:roomId/:baseRate/:arrival/:departure'element={<Reservation/>}/>
          <Route path='/searchRooms'element={<MoreDetails/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
