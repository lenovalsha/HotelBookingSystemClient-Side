import { Link } from "react-router-dom";


function Application(){
    return(<div className="container">
            <h1>Company</h1>
        <div className="sub">          
            <Link to="/stafflogin">
            <button>Staff</button>
            </Link>
            <Link to="/adminlogin">
            <button>Admin</button>
            </Link>
        </div>
    </div>)
}
export default Application;