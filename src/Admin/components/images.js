import { useEffect, useState } from "react";
import { BASEPATH } from "../../config";
function Images(props) {
  const [roomList, setRoomList] = useState([]);
  const [roomSelected, setRoomSelected] = useState();
  const [image, setImage] = useState();
  let hotelId = sessionStorage.getItem("hotelId");
  
  //get a list of the rooms
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(BASEPATH + props.fetch);
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
        blob: selectedImage,
      });
    }
  };
  async function AddImage() {
    if (!image) {
      alert("no image");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(image.blob);
    reader.onload = async () => {
      // Convert the image to a base64-encoded string
      const base64Image = reader.result.replace(
        /^data:image\/(png|jpg|jpeg);base64,/,
        ""
      );
      // Send updated staff data to server
      async function fetchData(){
        let resp;
        let body;
        const headers = {
          "Content-Type": "application/json",
        };
        if(props.fetch ==="rooms")
        {
         body = JSON.stringify({
            image: base64Image,
            roomId: roomSelected
          })
        }
        else if(props.fetch === "hotels")
        {
          body = JSON.stringify({
            image: base64Image,
            hotelId: hotelId
          })
         
        }
        resp = await fetch(BASEPATH + props.image,{
          method: "POST",
          headers,
          body:body
        });
      }
      fetchData();
    }
    
  }
  //show certain elements depending on the type of image needed to send
   function Show(){
    if(props.fetch === "rooms")
    {
      return(
        <select onChange={(e) => setRoomSelected(e.target.value)}>
            {
              //loop through the list and add it as option
              roomList.map((prio) => (
                <option value={prio.Id} key={prio.Id}>
                  {prio.RoomNumber}
                </option>
              ))
            }
          </select>
      )
    }else if(props.fetch === "hotels")
    {
      return(

        <input type="text" value={hotelId} onChange={(e) => setRoomSelected(e.target.value)}/>
      )

    }
  }

  return (
    <div>
      <p>This is for the image</p>
      {Show()}
      <label>Select {props.fetch}</label>
      <input
        className="file"
        type="file"
        onClick={onImageChange}
        accept="image/*"
      />
      <button onClick={AddImage}>Add Room Image</button>
    </div>
  );
}
export default Images;
