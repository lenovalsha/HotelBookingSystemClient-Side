import { Link } from "react-router-dom";
import { COMPANY } from "./config";


function Application(){
    return(
        <div className="case">
    <div className="flex-column">
            <h2>{COMPANY}</h2>
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