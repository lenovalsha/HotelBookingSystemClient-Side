import React, { useEffect, useState } from "react";
import { hashPassword,BASEPATH } from "../config";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
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
        <Navbar/>
        <h1>Login</h1>
        <div className="sub">
        <input type="text" onChange={(e)=> setEmail(e.target.value)} value={email} placeholder="Email"/>
        <input type="password" onChange={(e)=> setPassword(e.target.value)} value={password} placeholder="Password"/>
        <button onClick={LoginGuest}>Login</button>
        <Link to="/gregister">
            <p>Not a member? Register</p>
        </Link>
        </div>
    </div>)
}
export default Login;