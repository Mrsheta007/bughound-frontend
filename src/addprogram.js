// AddProgram.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProgram = () => {
  const [programs, setPrograms] = useState([]);
  const [name, setName] = useState("");
  const [version, setVersion] = useState(0);
  const [rel, setRelease] = useState(0);

  useEffect(() => {
    //Retrieve the list of programs from the database
    axios.get("http://localhost:3000/getprograms").then((res) => {
      setPrograms(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the form data to the backend
    axios
      .post("http://localhost:3000/addprograms", { name, version, rel })
      .then(() => {
        window.location.reload();
        // Reload the page to show the updated list of programs
      });
  };

  const handleCancel = () => {
    // Reload the page to cancel the form
    window.location.reload();
  };

  return (
    <div>
      <h1>Add Program</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Version</th>
            <th>Release</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => (
            <tr key={program.id}>
              <td>{program.id}</td>
              <td>{program.name}</td>
              <td>{program.version}</td>
              <td>{program.rel}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label>Version:</label>
        <input
          type="number"
          min="0"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          required
        />
        <br />
        <label>Release:</label>
        <input
          type="number"
          min="0"
          value={rel}
          onChange={(e) => setRelease(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddProgram;
