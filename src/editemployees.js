import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
} from "@material-ui/core";

function Editemployees() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState("");
  const employee_id = searchParams.get("employee_id");

  useEffect(() => {
    axios
      .get(`https://bughound-backend.vercel.app/getemployee/${employee_id}`)
      .then((res) => {
        setEmployees(res.data);
      });
  }, [employee_id]);

  const handleUpdateEmployeeName = (id, name) => {
    const updatedEmployees = employees.map((employees) =>
      employees.id === id ? { ...employees, name } : employees
    );
    setEmployees(updatedEmployees);
  };

  const handleUpdateEmployeeLevel = (id, user_level) => {
    const updatedEmployees = employees.map((employees) =>
      employees.id === id ? { ...employees, user_level } : employees
    );
    setEmployees(updatedEmployees);
  };

  const handleUpdateEmployee = (id, name, user_level) => {
    axios
      .put(`https://bughound-backend.vercel.app/updateemployee/${id}`, {
        name,
        user_level,
      })
      .then(() => {
        const updatedEmployees = employees.map((employees) =>
          employees.id === id ? { ...employees, name, user_level } : employees
        );
        setEmployees(updatedEmployees);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>User Level</TableCell>
            <TableCell>Username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employees) => (
            <TableRow key={employees.id}>
              <TableCell>{employees.id}</TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  value={employees.name}
                  onChange={(e) =>
                    handleUpdateEmployeeName(employees.id, e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Select
                  variant="outlined"
                  value={employees.user_level}
                  onChange={(e) =>
                    handleUpdateEmployeeLevel(employees.id, e.target.value)
                  }
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
              </TableCell>
              <TableCell>{employees.username}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleUpdateEmployee(
                      employees.id,
                      employees.name,
                      employees.user_level
                    )
                  }
                >
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Editemployees;
