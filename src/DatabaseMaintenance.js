// DatabaseMaintenance.js

import React from "react";
//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const DatabaseMaintenance = () => {
  return (
    <div>
      <h1>Database Maintenance</h1>
      <ul>
        <li>
          <a href="/addareas">Edit/Add Areas</a>
        </li>
        <li>
          <a href="/addprograms">Add Programs</a>
        </li>
        <li>
          <a href="/getprogram">Edit Programs</a>
        </li>
        <li>
          <a href="/addemployee">Add Employees</a>
        </li>
        <li>
          <a href="/getemployees">Edit Employees</a>
        </li>
        <li>
          <a href="/export-areas">Export Areas</a>
        </li>
      </ul>
    </div>
  );
};

export default DatabaseMaintenance;
