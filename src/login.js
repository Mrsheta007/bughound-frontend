import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://bughound-backend.vercel.app/login", { username, password })
      .then((response) => {
        // Login successful, redirect to bughoundstartpage with employee name and userlevel.

        const { userlevel } = response.data;
        console.log(
          "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++:",
          response.data
        );
        window.location.href = `/BughoundStartPage?employeeName=${username}&userLevel=${userlevel}`;
      })
      .catch((error) => {
        // Login failed, display error message
        setErrorMessage("Invalid username or password");
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <h5>username:admin password:admin</h5>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
