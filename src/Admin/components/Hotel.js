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

            navigate("/panel");
          } catch (error) {
            console.error("Error:", error);
          }
        };
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
        <Provinces setProv={setProvince}/>
        <label>Phone</label> 
        <input value={phone} onChange={(e) => setPhone(e.target.value) } type="text"/>
        <input className="file" type="file"  onChange={onImageChange} accept="image/*"/>
        <button onClick={RegisterHotel}>Register Hotel</button>
    </form>)
}
export default Hotel;