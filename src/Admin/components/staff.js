import { useState,useEffect } from "react";
import { BASEPATH } from "../../config";
function AddStaff()
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
    const [positionId,setPositionId] = useState("");
    const [positionList,setPositionList] = useState([]);
    let HOTELID = sessionStorage.getItem("hotelId");

    //get list of positions available for staff
    useEffect(() => {
        const fetchData = async () => {
          const resp = await fetch(BASEPATH + "positions/hotelId/" + HOTELID);
          const data = await resp.json();
          setPositionList(data);
        };
        fetchData();
      }, []);
    async function RegisterStaff()
    {
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
                password:password,
                positionId:positionId,
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
    return(<div>
        <h1>Staff</h1>
        <label>First Name</label> 
        <input value={fname} onChange={(e) => setFName(e.target.value) } type="text"/>
        <label>Last Name</label> 
        <input value={lname} onChange={(e) => setLName(e.target.value) } type="text"/>
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
        <label>Username</label> 
        <input value={username} onChange={(e) => setUsername(e.target.value) } type="text"/>
        <label>Password</label> 
        <input value={password} onChange={(e) => setPassword(e.target.value) } type="text"/>
        <label>Position</label> 
        <select onChange={(e) => setPositionId(e.target.value)}>
            {
              //loop through the list and add it as option
              positionList.map((prio) => (
                <option value={prio.Id} key={prio.Id}>
                  {prio.Name}
                </option>
              ))
            }
          </select>
        <button onClick={RegisterStaff}>Register Staff</button>
    </div>)
}

export default AddStaff;