import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASEPATH, ADMIN } from "../config";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.clear(); //clear our storage so we cant access the form after logging out
  });

  async function login() {
    const hashedPassword = await hashPassword(password);
    fetch(BASEPATH + "admins/" + username)
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
            sessionStorage.setItem("admin", username);
            navigate("/panel")
            // navigate("/panel");
          } else console.log(username + " has failed to logged in");
        }
      })
      .catch((err) => {
        console.log("Login failed " + err.message);
      });
    }
 
  //#region Register
  async function Register() {
    const passwordHash = await hashPassword(password);

    let result = await fetch(BASEPATH + "admins", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: passwordHash,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
  }
  //#endregion

  //#region Hasher
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return hexString(hash);
  }
  function hexString(buffer) {
    const byteArray = new Uint8Array(buffer);
    const hexCodes = [...byteArray].map((value) => {
      const hexCode = value.toString(16);
      const paddedHexCode = hexCode.padStart(2, "0");
      return paddedHexCode;
    });
    return hexCodes.join("");
  }
  //#endregion
  return (
    <div>
      <h2>Register/Login</h2>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        className="form-control"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Password:</label>

      <input
        type="password"
        value={password}
        className="form-control"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={Register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
}
export default Login;
