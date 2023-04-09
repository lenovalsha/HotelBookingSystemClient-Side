import { useState } from "react"
import { BASEPATH } from "../config";
import { hashPassword } from "../config";

export function Register(){

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
        <label>First Name</label>
        <input type="text" value={fname} onChange={(e)=> setFname(e.target.value)}/>
        <label>Last Name</label>
        <input type="text" value={lname} onChange={(e)=> setLname(e.target.value)}/>
        <label>Email</label>
        <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <label>Address</label>
        <input type="text" value={address} onChange={(e)=> setAddress(e.target.value)}/>
        <label>City</label>
        <input type="text" value={city} onChange={(e)=> setCity(e.target.value)}/>
        <label>Postal</label>
        <input type="text" value={postal} onChange={(e)=> setPostal(e.target.value)}/>
        <label>Phone</label>
        <input type="text" value={phone} onChange={(e)=> setPhone(e.target.value)}/>
        <label>Password</label>
        <input type="password" value={password} onChange={(e)=> setPassord(e.target.value)}/>
        <button onClick={RegisterGuest}>Register</button>
    </div>)
}