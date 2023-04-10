import {Link} from 'react-router-dom'
function Navbar(){
    return(
        <div className='navbar'>
        <h1>Company</h1>
        <nav>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/gregister">Register</Link></li>
                <li><Link to="/glogin">Login</Link></li>
            </ul>
        </nav>
        </div>
    )
}
export default Navbar;