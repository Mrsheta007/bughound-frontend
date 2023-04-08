import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const BugList = () => {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/searchresult")
      .then((response) => {
        setBugs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Program Name</TableCell>
            <TableCell>Summary</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bugs.map((bug) => (
            <TableRow key={bug.id}>
              <TableCell>{bug.id}</TableCell>
              <TableCell>{bug.name}</TableCell>
              <TableCell>{bug.problem_summary}</TableCell>
              <TableCell>
                <Link to={`/editbug?bug_id=${bug.id}`}>Edit</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BugList;
