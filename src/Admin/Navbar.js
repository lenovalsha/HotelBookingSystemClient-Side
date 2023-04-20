import {Link} from 'react-router-dom'
import { COMPANY } from '../config';
function Navbar(){
    return(
        <div className='top-container'>
        <h1>{COMPANY}</h1>
        <nav>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/staffs">Staff</Link></li>
                <li><Link to="/adminrooms">Rooms</Link></li>
                <li><Link to="/applications">Logout</Link></li>

            </ul>
        </nav>
        </div>
    )
}
export default Navbar;