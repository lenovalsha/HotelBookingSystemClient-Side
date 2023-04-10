import { Register } from "./Register";
import Login from "./Login";
function Guest(){
    return(<div className="container">
        <Register/>
        <Login/>
    </div>)
}
export default Guest;