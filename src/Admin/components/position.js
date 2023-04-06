import { useState } from "react";
import { BASEPATH } from "../../config";

function Position(){
    const [name,setName] = useState("");
    let HOTELID = sessionStorage.getItem("hotelId");
    async function Register(){
        let result = await fetch(BASEPATH + "positions",{
            method: "POST",
            body: JSON.stringify({
                name:name,
                hotelId: HOTELID
            }),headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
        })
        result = await result.json();

    }

    return(<div>
        <h2>Add Positions</h2>
        <label>Position Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <button onClick={Register}>Add Position</button>
    </div>)
}

export default Position;