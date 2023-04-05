import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASEPATH,ADMIN } from "../config";
function Hotel(){
    let admin = sessionStorage.getItem("admin");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city,setCity] = useState("");
    const [postal,setPostal] = useState("");
    const [phone,setPhone] = useState("");
    const navigate = useNavigate();
    if(ADMIN === null)
    {
        navigate("/register");
    }
    async function RegisterHotel(props){
        let result = await fetch(BASEPATH + "hotels",{
        method:"POST",
        body: JSON.stringify({
            adminusername : ADMIN,
            name: props.name,
            email:props.email,
            address:props.address,
            city:props.city,
            postal:props.postal,
            phone:props.phone
        }), headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        result = await result.json();
        navigate("/panel");
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
        <button onClick={() => RegisterHotel}>Register Hotel</button>
    </form>)
}
export default Hotel;