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

const Getemployees = () => {
  const [employees, setemployees] = useState([]);

  useEffect(() => {
    axios
      .get("https://bughound-backend.vercel.app/getemployees")
      .then((res) => {
        console.log("this is the received data from getemployees:", res);
        setemployees(res.data);
      });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>

            <th>level</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employees) => (
            <tr key={employees.id}>
              <td>{employees.id}</td>
              <td>{employees.name}</td>

              <td>{employees.user_level}</td>
              <td>
                <Link
                  to={`https://bughound-frontend.vercel.app/updateemployee?employee_id=${employees.id}`}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Getemployees;
