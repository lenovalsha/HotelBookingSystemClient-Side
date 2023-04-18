import { useState } from "react";

export default function Provinces(props) {
    const [province,setProvince] = useState();
  const provinces = [
    { id: 1, prov: "AB" },
    { id: 2, prov: "BC" },
    { id: 3, prov: "MB" },
    { id: 4, prov: "NB" },
    { id: 5, prov: "NL" },
    { id: 6, prov: "NT" },
    { id: 7, prov: "NS" },
    { id: 8, prov: "NU" },
    { id: 9, prov: "ON" },
    { id: 10, prov: "PE" },
    { id: 11, prov: "QC" },
    { id: 12, prov: "SK" },
    { id: 13, prov: "YT" },
  ];
  return(<div className="province-selector">
    <label>Select a province:</label>

      <select onChange={(e)=>props.setProv(e.target.value)}>
    <option value={""} key={0}></option>
    {
        provinces.map((e)=>(
            <option value={e.prov} key={e.id}>
              {e.prov}
            </option>
        ))
    }
</select></div>)
}