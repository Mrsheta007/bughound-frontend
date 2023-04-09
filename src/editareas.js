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
} from "@material-ui/core";

function Editareas() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [areas, setAreas] = useState([]);
  const [newArea, setNewArea] = useState("");
  const programId = searchParams.get("program_id");

  useEffect(() => {
    axios
      .get(`https://bughound-backend.vercel.app/getareas/${programId}`)
      .then((res) => {
        setAreas(res.data);
      });
  }, [programId]);

  const handleAddArea = () => {
    axios
      .post("https://bughound-backend.vercel.app/addarea", {
        programId: programId,
        area: newArea,
      })
      .then((res) => {
        window.location.reload();
        setAreas([...areas, { area_id: res.data.id, area_name: newArea }]);
        setNewArea("");
      });
  };

  const handleUpdateAreaName = (area_id, area_name) => {
    const updatedAreas = areas.map((area) =>
      area.area_id === area_id ? { ...area, area_name } : area
    );
    setAreas(updatedAreas);
  };

  const handleUpdateArea = (area_id, area_name) => {
    axios
      .put(`https://bughound-backend.vercel.app/updatearea/${area_id}`, {
        area_name,
      })
      .then(() => {
        const updatedAreas = areas.map((area) =>
          area.area_id === area_id ? { ...area, area_name } : area
        );
        setAreas(updatedAreas);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Area ID</TableCell>
            <TableCell>Program ID</TableCell>
            <TableCell>Area</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {areas.map((area) => (
            <TableRow key={area.area_id}>
              <TableCell>{area.area_id}</TableCell>
              <TableCell>{programId}</TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  value={area.area_name}
                  onChange={(e) =>
                    handleUpdateAreaName(area.area_id, e.target.value)
                  }
                  required
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateArea(area.area_id, area.area_name)}
                >
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell>{programId}</TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                required
              />
            </TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddArea}
                disabled={!newArea}
              >
                Add Area
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Editareas;
