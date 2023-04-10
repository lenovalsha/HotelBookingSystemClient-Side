import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASEPATH } from "../config";
import { hashPassword } from "../config";

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

            //see if the user has a hotel associated with them
            fetch(BASEPATH + "hotels/adminusername/" + username)
              .then((r) => {
                return r.json();
              })
              .then((resp2) => {
                if (username === "ADMIN") {
                  navigate("/settings");
                } else if (resp2.status === 404) {
                  navigate("/hotel");
                } else {
                  let hotelId = resp2[0].Id;
                  sessionStorage.setItem("hotelId", hotelId);
                  navigate("/panel");
                }
              });
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

  return (
    <div className="container">
      <h2>Register/Login</h2>
      <section className="sub container">

      <input
        type="text"
        value={username}
        className="form-control"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        className="form-control"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={Register}>Register</button>
      <button onClick={login}>Login</button>
      </section>
      
    </div>
  );
}
export default Login;
