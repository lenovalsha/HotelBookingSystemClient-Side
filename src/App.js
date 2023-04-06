
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Hotel from './Admin/components/Hotel';
import Login from './Admin/Login';
import Panel from './Admin/Panel';
import Settings from './Components/Settings';
import { BASEPATH } from './config';

function App() {
  async function GenerateAll(){

  const statuses = [{BookingStatus:"bookingstatus", body: {name:"Test", description:"This is testing1"} }]
    let result = await fetch(BASEPATH + statuses[0].BookingStatus,{
      method:"POST",
      body:JSON.stringify(statuses[0].body),
      headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
    })
    result = await result.json();
  }

  return (
    <div className="App">
      <button onClick={GenerateAll}>Generate All basics</button>
      <Settings/>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Login/>}/>
          <Route path='/hotel' element={<Hotel/>}/>
          <Route path='/panel' element={<Panel/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
