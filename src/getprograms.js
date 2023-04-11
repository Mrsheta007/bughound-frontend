import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from "@material-ui/core";
import axios from "axios";

import { Link } from "react-router-dom";

const Getprogram = () => {
  const [program, setprogram] = useState([]);

  useEffect(() => {
    axios.get("https://bughound-backend.vercel.app/getprograms").then((res) => {
      console.log("this is the received data from getprogram:", res);
      setprogram(res.data);
    });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>version</th>

            <th>relese</th>
          </tr>
        </thead>
        <tbody>
          {program.map((program) => (
            <tr key={program.id}>
              <td>{program.id}</td>
              <td>{program.name}</td>

              <td>{program.version}</td>
              <td>{program.rel}</td>
              <td>
                <Link to={`/updateprogram?id=${program.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Getprogram;
