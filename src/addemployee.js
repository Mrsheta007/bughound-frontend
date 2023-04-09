import React, { useState } from "react";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userLevel, setUserLevel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = { name, username, password, userLevel };
    console.log();
    fetch("http://localhost:3000/addemployee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    //window.location.reload();
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          User Level:
          <select
            value={userLevel}
            onChange={(e) => setUserLevel(e.target.value)}
            required
          >
            <option value="">Select a level</option>
            <option value="admin">Admin</option>
            <option value="user">user</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddEmployee;
