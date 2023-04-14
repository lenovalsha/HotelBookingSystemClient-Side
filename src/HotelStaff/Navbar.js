import { Link } from "react-router-dom"
import { COMPANY } from "../config"
export default function Navbar(){
    return(

         <nav className="side">
            <ul>
                <li><Link to="/sdashboard">Dashboard</Link></li>
                <li><Link to="/staffs">CheckIn</Link></li>
                <li><Link to="/rooms">Rooms</Link></li>
                <li><Link to="/rooms">Walk-In</Link></li>
                <li><Link to="/rooms">Contact</Link></li>

            </ul>
        </nav>

   )
}