import { useState } from "react"
import { BASEPATH } from "../config";

function Set(props)
{
    const [name,setName] = useState("");
    async function Add(){

        let result = await fetch(BASEPATH + props.path,{
            method:"POST",
            body: JSON.stringify({
                name: name
            }),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
    result =  await result.json();
    alert("Added Successfully!")
    setName("");
}

    return(<>
            <input type="text" placeholder={props.title} value={name} onChange={(e) => setName(e.target.value)}/>
            <button onClick={Add}>Add</button>
        </>)
}

export default Set;