import { Link } from "react-router-dom";
import { COMPANY } from "./config";


function Application(){
    return(<div className="container">
            <h1>{COMPANY}</h1>
        <div className="sub">          
            <Link to="/slogin">
            <button>Staff</button>
            </Link>
            <Link to="/adminlogin">
            <button>Admin</button>
            </Link>
        </div>
    </div>)
}
export default Application;