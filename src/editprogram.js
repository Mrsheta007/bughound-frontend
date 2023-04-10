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

function Editprogram() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [program, setprogram] = useState([]);

  const program_id = searchParams.get("id");

  console.log("this is Edit program page with the program id :", program_id);

  useEffect(() => {
    axios
      .get(`https://bughound-backend.vercel.app/getoneprogram/${program_id}`)
      .then((res) => {
        console.log("this is we got the program:", res.data);
        setprogram(res.data);
      });
  }, [program_id]);

  const handleUpdateProgramName = (id, name) => {
    const updateprograms = program.map((program) =>
      program.id === id ? { ...program, name } : program
    );
    setprogram(updateprograms);
  };

  const handleUpdateversion = (id, version) => {
    const updateprograms = program.map((program) =>
      program.id === id ? { ...program, version } : program
    );
    setprogram(updateprograms);
  };

  const handleUpdaterelese = (id, rel) => {
    const updateprograms = program.map((program) =>
      program.id === id ? { ...program, rel } : program
    );
    setprogram(updateprograms);
  };

  const handleUpdateprogram = (id, name, version, rel) => {
    axios
      .put(`https://bughound-backend.vercel.app/updateprogram/${id}`, {
        name,
        version,
        rel,
      })
      .then(() => {
        const updateprograms = program.map((program) =>
          program.id === id ? { ...program, name, version, rel } : program
        );
        setprogram(updateprograms);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Program ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>version</TableCell>
            <TableCell>rel</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {program.map((program) => (
            <TableRow key={program.id}>
              <TableCell>{program.id}</TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  value={program.name}
                  onChange={(e) =>
                    handleUpdateProgramName(program.id, e.target.value)
                  }
                />
              </TableCell>

              <TableCell>
                <TextField
                  variant="outlined"
                  value={program.version}
                  onChange={(e) =>
                    handleUpdateversion(program.id, e.target.value)
                  }
                />
              </TableCell>

              <TableCell>
                <TextField
                  variant="outlined"
                  value={program.rel}
                  onChange={(e) =>
                    handleUpdaterelese(program.id, e.target.value)
                  }
                />
              </TableCell>

              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleUpdateprogram(
                      program.id,
                      program.name,
                      program.version,
                      program.rel
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

export default Editprogram;
