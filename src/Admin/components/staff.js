import { useEffect, useState} from "react";
import { BASEPATH } from "../../config";
import { hashPassword } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
export default function StaffRegister()
{
    const [fname,setFName] = useState("");
    const [lname,setLName] = useState("");
    const [email,setEmail] = useState("");
    const [address,setAddress] = useState("");
    const [city,setCity] = useState("");
    const [postal,setPostal] = useState("");
    const [phone,setPhone] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    let HOTELID = sessionStorage.getItem("hotelId");

   
    async function Register()
    {
      const passwordHash = await hashPassword(password);
        let result = await fetch(BASEPATH + "staffs",{
            method:"POST",
            body: JSON.stringify({
                firstname:fname,
                lastName:lname,
                email:email,
                address:address,
                city:city,
                postal:postal,
                phone:phone,
                username:username,
                password:passwordHash,
                hotelId:HOTELID
            }),
            headers:{
                "Content-Type" : "application/json",
                Accept: "application/json",
            }
        })
        result = await result.json();
        alert("ADDED")
    }
    return(<div className="">
    <Navbar/>
        <h1>Register A Staff</h1>
        <section className="sub">
        <input value={fname} onChange={(e) => setFName(e.target.value) } type="text" placeholder="First Name"/>
        <input value={lname} onChange={(e) => setLName(e.target.value) } type="text" placeholder="Last Name"/>
        <input value={email} onChange={(e) => setEmail(e.target.value) } type="text" placeholder="Email"/>
        <input value={address} onChange={(e) => setAddress(e.target.value) } type="text" placeholder="Address"/>
        <input value={city} onChange={(e) => setCity(e.target.value) } type="text" placeholder="City"/>
        <input value={postal} onChange={(e) => setPostal(e.target.value) } type="text" placeholder="Postal"/>
        <input value={phone} onChange={(e) => setPhone(e.target.value) } type="text" placeholder="Phone" />
        <input value={username} onChange={(e) => setUsername(e.target.value) } type="text" placeholder="Username"/>
        <input value={password} onChange={(e) => setPassword(e.target.value) } type="text" placeholder="Password"/>             
        <button onClick={Register}>Register Staff</button>
        </section>
    </div>)
}
export function StaffLogin(){
  sessionStorage.clear();
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  async function LoginGuest() {
      const hashedPassword = await hashPassword(password); //hash it
      fetch(BASEPATH + "staffs/username/" + username)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          //if user isnt found
          if (Object.keys(resp).length === 0) {
            console.log("Login failed");
          } else {
            //see if password matches
            if (resp.Password === hashedPassword) {
              let hotelId = resp.Id;
              sessionStorage.setItem("hotelId", hotelId);
              sessionStorage.setItem("admin", username);
              console.log("login successful")
              navigate("/sdashboard");
            } else console.log(username + " has failed to logged in");
          }
        })
        .catch((err) => {
          console.log("Login failed " + err.message);
        });
      }
  return(<div className="container">
  <h1>Login Staff</h1>
  <section className="sub container">
      <input type="text" onChange={(e)=> setUsername(e.target.value)} value={username} placeholder="Username"/>
      <input type="password" onChange={(e)=> setPassword(e.target.value)} value={password} placeholder="Password"/>
      <button onClick={LoginGuest}>Login</button>
  </section>
  </div>)
}
export function StaffList(){
  const [staffList,setStaffList] = useState([]);
  const HOTELID = sessionStorage.getItem("hotelId");

  //get list
  useEffect(() => {
    //get the status list data
    const fetchData = async () => {
      const resp = await fetch(BASEPATH + "staffs/hotelId/"+HOTELID);
      const newData = await resp.json();
      setStaffList(newData); //save the list of newDate to the list
      console.log(newData);
    };
    fetchData();
  }, []);

  return(<div>
  <Navbar/>
    <h1>HotelId: {HOTELID}</h1>
  <section>
    {staffList.map((s)=>{
      <div className="staff">
      <h1>{s.Firstname}</h1>
      <h1>{s.Lastname}</h1>
      </div>
    })}
  </section>
  <Link to="/sregister">
  <button>Register a staff</button>
  </Link>
  </div>)
}