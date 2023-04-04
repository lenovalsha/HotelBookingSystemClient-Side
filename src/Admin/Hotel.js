import React, { useState } from "react";

function Hotel(){
    let admin = sessionStorage.getItem("admin");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city,setCity] = useState("");
    const [postal,setPostal] = useState("");
    const [phone,setPhone] = useState("");
    async function RegisterHotel(){
        let result = await fetch("https://localhost:7285/api/hotels",{
        method:"POST",
        body: JSON.stringify({
            adminusername : admin,
            name: name,
            email:email,
            address:address,
            city:city,
            postal:postal,
            phone:phone
        }), headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        result = await result.json();
    }
    return(<form>
        <label>Name</label> 
        <input value={name} onChange={(e) => setName(e.target.value) } type="text"/>
        <label>Email</label> 
        <input value={email} onChange={(e) => setEmail(e.target.value) } type="text"/>
        <label>Address</label> 
        <input value={address} onChange={(e) => setAddress(e.target.value) } type="text"/>
        <label>City</label> 
        <input value={city} onChange={(e) => setCity(e.target.value) } type="text"/>
        <label>Postal</label> 
        <input value={postal} onChange={(e) => setPostal(e.target.value) } type="text"/>
        <label>Phone</label> 
        <input value={phone} onChange={(e) => setPhone(e.target.value) } type="text"/>
        <button onClick={RegisterHotel}>Register Hotel</button>
    </form>)
}
export default Hotel;