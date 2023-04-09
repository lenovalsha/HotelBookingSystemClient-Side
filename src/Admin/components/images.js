import { useEffect, useState } from "react";
import { BASEPATH } from "../../config";
function Images(props) {
  const [image, setImage] = useState(null);
  const [room,setRoom] = useState("");
  const [roomList,setRoomList] = useState([]);
  let HOTELID = sessionStorage.getItem("hotelId");
  // get a list of the rooms
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(BASEPATH + "rooms/hotelId/" +HOTELID);
      const data = await resp.json();
      setRoomList(data);
    };
    fetchData();
  }, []);

  //work on this later so its not so buggy
  
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
        const selectedImage = event.target.files[0];
        setImage({
          url: URL.createObjectURL(selectedImage),
          blob: selectedImage
        });
      }
      
}
  async function AddImage() {
    if (!image) {
      alert("no image");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(image.blob);
    reader.onload = async () => {
      // Convert the image to a base64-encoded string
    const base64Image = reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    const result = await fetch(BASEPATH + "roomImages/",{
      method:"POST",
      body: JSON.stringify({
        image:base64Image,
        roomNumber:room,
        hotelId:HOTELID
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    const data = await result.json();
    console.log(data);
    
  }
  }
  return (
    <div>
     <select onChange={(e) => setRoom(e.target.value)}>
        {
          //loop through the list and add it as option
          roomList.map((prio) => (
            <option value={prio.Id} key={prio.Id}>
              {prio.RoomNumber}
            </option>
          ))
        }
      </select>
      <p>This is for the image</p>
      <input
        className="file"
        type="file"
        onChange={onImageChange}
        accept="image/*"
      />
      <button onClick={AddImage}>Add Room Images</button>
    </div>
  );
}
export default Images;
