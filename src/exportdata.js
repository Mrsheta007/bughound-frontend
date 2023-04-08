import React, { useState } from "react";
import axios from "axios";

const ExportForm = () => {
  const [tableName, setTableName] = useState("");

  const handleExport = () => {
    if (!tableName) {
      alert("Please select a table name");
      return;
    }
    axios
      .get(`http://localhost:3000/export/${tableName}`)
      .then((res) => {
        const blob = new Blob([res.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${tableName}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error(err);
        alert("Error exporting data");
      });
  };

  return (
    <div>
      <select value={tableName} onChange={(e) => setTableName(e.target.value)}>
        <option value="">Select a table</option>
        <option value="addprogram">Add Program</option>
        <option value="areas">Areas</option>
        <option value="bug">Bug</option>
        <option value="employees">Employees</option>
      </select>
      <button onClick={handleExport}>Export</button>
    </div>
  );
};

export default ExportForm;
