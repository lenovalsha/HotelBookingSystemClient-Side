import {Link} from 'react-router-dom'
function Navbar(){
    return(
        <div className='top-container'>
        <h1>Company</h1>
        <nav>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/staffs">Staff</Link></li>
                <li><Link to="/rooms">Rooms</Link></li>
            </ul>
        </nav>
        </div>
    )
}
export default Navbar;