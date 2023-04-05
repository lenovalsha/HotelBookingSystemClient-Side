import { useEffect, useState } from "react";
import { createRoutesFromChildren } from "react-router-dom";
import { BASEPATH } from "../../config";

function RoomImages(){
    const [roomList, setRoomList] = useState([]);
    const [roomSelected,setRoomSelected] = useState();
    const [image, setImage] = useState();
    useEffect(()=>{
        const fetchData = async() =>{
            const resp = await fetch(BASEPATH + "rooms");
            const data = await resp.json();
            setRoomList(data);
            
        };
        fetchData();
    },[]);
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const selectedImage = event.target.files[0];
            setImage({
              url: URL.createObjectURL(selectedImage),
              blob: selectedImage
            });
          }
       }
       async function AddRoomImage(){
        if (!image) 
        {
        alert("no image")
        return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(image.blob);
        reader.onload = async () => {
          // Convert the image to a base64-encoded string
          const base64Image = reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    
          // Send updated staff data to server
          const resp = await fetch(BASEPATH + "roomimages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image: base64Image,
                roomID: roomSelected
            }),
          });
          resp = await resp.json();
        };
      };
    
    return(<div>
        <p>This is for the image</p>
        <label>Room Number</label><select onChange={(e) => setRoomSelected(e.target.value)}>
              {
                //loop through the list and add it as option
                roomList.map((prio) => (
                  <option value={prio.Id} key={prio.Id}>
                    {prio.RoomNumber}
                  </option>
                ))
              }
            </select>
            <input className="file" type="file"  onClick={onImageChange} accept="image/*"/>
            <button onClick={AddRoomImage}>Add Room Image</button>
        
    </div>)
}
export default RoomImages;