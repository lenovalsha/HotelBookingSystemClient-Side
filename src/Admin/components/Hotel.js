import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASEPATH} from "../../config";
import Provinces from "../../Components/province";
function Hotel(){
    let admin = sessionStorage.getItem("admin");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city,setCity] = useState("");
    const [postal,setPostal] = useState("");
    const [phone,setPhone] = useState("");
    const [province,setProvince] = useState("");
    const [image,setImage] = useState(null);

    const navigate = useNavigate();
    if(admin === null)
    {
        navigate("/register");
    }
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const selectedImage = event.target.files[0];
            setImage({
              url: URL.createObjectURL(selectedImage),
              blob: selectedImage
            });
          }
    }
    async function RegisterHotel(){
        if (!image) {
          alert("no image");
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(image.blob);
        reader.onload = async () => {
          // Convert the image to a base64-encoded string
          const base64Image = reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
          try {
            const result = await fetch(BASEPATH + "hotels", {
              method: "POST",
              body: JSON.stringify({
                adminusername : admin,
                name: name,
                email: email,
                address: address,
                city: city,
                postal: postal,
                province:province,
                phone: phone,
                image: base64Image,
              }),
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            });
            if (!result.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await result.json();
            console.log(data);
            // sessionStorage.setItem("hotelId",)
            navigate("/applications");
          } catch (error) {
            console.error("Error:", error);
          }
        };
      }
    return(
    <div className="case">

    <div className="flex-column">
        <h2>Register your hotel with us!</h2>
        <input value={name} placeholder="Hotel Name" onChange={(e) => setName(e.target.value) } type="text"/>
        <input value={email} placeholder="Hotel Email" onChange={(e) => setEmail(e.target.value) } type="text"/>
        <input value={address} placeholder="Hotel Address" onChange={(e) => setAddress(e.target.value) } type="text"/>
        <input value={city} placeholder="City" onChange={(e) => setCity(e.target.value) } type="text"/>
        <input value={postal} placeholder="Postal" onChange={(e) => setPostal(e.target.value) } type="text"/>
        <input value={phone} placeholder="Hotel Phone" onChange={(e) => setPhone(e.target.value) } type="text"/>
        <div className="province">
        <Provinces setProv={setProvince}/>
        </div>
        <input className="file" type="file"  onChange={onImageChange} accept="image/*"/>
        <button onClick={RegisterHotel}>Register Hotel</button>
    </div>
    </div>)
}
export default Hotel;