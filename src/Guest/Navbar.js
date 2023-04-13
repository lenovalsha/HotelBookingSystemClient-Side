import {Link} from 'react-router-dom'
import { COMPANY } from '../config';
function Navbar(){
    return(
        <div className='navbar'>
        <h1>{COMPANY}</h1>
        <nav>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/myreservations">My Reservations</Link></li>
                <li><Link to="/gregister">Register</Link></li>
                <li><Link to="/glogin">Login</Link></li>
            </ul>
        </nav>
        </div>
    )
}
export default Navbar;