import React, { useEffect, useState } from "react";
import { hashPassword,BASEPATH } from "../config";
import { useNavigate } from "react-router-dom";
function Login(){
    sessionStorage.clear();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    async function LoginGuest() {
        const hashedPassword = await hashPassword(password); //hash it
        fetch(BASEPATH + "guests/" + email)
          .then((res) => {
            return res.json();
          })
          .then((resp) => {
            //if user isnt found
            if (Object.keys(resp).length === 0) {
              console.log("Login failed");
            } else {
              //see if password matches
              if (resp.Password === hashedPassword) {
                sessionStorage.setItem("guest", email);
                console.log("login successful")
                navigate("/home");
              } else console.log(email + " has failed to logged in");
            }
          })
          .catch((err) => {
            console.log("Login failed " + err.message);
          });
        }
    return(<div>
        <label>Username</label>
        <input type="text" onChange={(e)=> setEmail(e.target.value)} value={email}/>
        <label>Password</label>
        <input type="password" onChange={(e)=> setPassword(e.target.value)} value={password}/>
        <button onClick={LoginGuest}>Login</button>
    </div>)
}
export default Login;