import { useState } from "react"
import { Link } from "react-router-dom";
import { BASEPATH } from "../config";
import { hashPassword } from "../config";
import Navbar from "./Navbar";


export default function Register(){

    const [fname,setFname] = useState("");
    const [lname,setLname] = useState(""); 
    const [email,setEmail] = useState(""); 
    const [address,setAddress] = useState(""); 
    const [city,setCity] = useState(""); 
    const [postal,setPostal] = useState(""); 
    const [phone,setPhone] = useState(""); 
    const [password,setPassord] = useState(""); 
    //post to server
    async function RegisterGuest(){
        
        const passwordHash = await hashPassword(password);

            let result = await fetch(BASEPATH + "guests",{
                method:"POST",
                body:JSON.stringify({
                email:email,
                firstName:fname,
                lastName:lname,
                address:address,
                city:city,
                postal:postal,
                phone:phone,
                password:passwordHash
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        result = await result.json();
        console.log("Guest succesfully registered");
    }
    return(<div>
        <Navbar/>
        <h1>Register</h1>
        <section className="sub">
        <input type="text" value={fname} onChange={(e)=> setFname(e.target.value)} placeholder="First Name"/>
        <input type="text" value={lname} onChange={(e)=> setLname(e.target.value)} placeholder="Last Name"/>
        <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Emal"/>
        <input type="text" value={address} onChange={(e)=> setAddress(e.target.value)} placeholder="Address"/>
        <input type="text" value={city} onChange={(e)=> setCity(e.target.value)} placeholder="City"/>
        <input type="text" value={postal} onChange={(e)=> setPostal(e.target.value)} placeholder="Postal"/>
        <input type="text" value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder="Phone"/>
        <input type="password" value={password} onChange={(e)=> setPassord(e.target.value)} placeholder="Password"/>
        <button onClick={RegisterGuest}>Register</button>
        <Link to="/glogin">
            <p>Already a member? Login</p>
        </Link>
        </section>
    </div>)
}