import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Addareas = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    axios.get("https://bughound-backend.vercel.app/getprograms").then((res) => {
      setPrograms(res.data);
    });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Version</th>
            <th>Release</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => (
            <tr key={program.id}>
              <td>{program.id}</td>
              <td>{program.name}</td>
              <td>{program.version}</td>
              <td>{program.rel}</td>
              <td>
                <Link to={`/editarea?program_id=${program.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Addareas;
