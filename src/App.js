// App.js
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BughoundStartPage from "./BughoundStartPage";
import DatabaseMaintenance from "./DatabaseMaintenance";
import AddEmployee from "./addemployee";
import AddProgram from "./addprogram";
import Login from "./login";
import Addareas from "./addareas";
import Editareas from "./editareas";
import Addbug from "./addbug";
import Searchresult from "./searchresult";
import Editbug from "./editbug";
import Exports from "./exportdata";
import Employees from "./getemployee";
import Editemployee from "./editemployees";
import Searchbug from "./searchbug";
import Getprogram from "./getprograms";
import Editprogram from "./editprogram";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/BughoundStartPage" element={<BughoundStartPage />} />
        <Route path="/database-maintenance" element={<DatabaseMaintenance />} />
        <Route path="/addemployee" element={<AddEmployee />} />
        <Route path="/addprograms" element={<AddProgram />} />
        <Route path="/getprograms" element={<AddProgram />} />
        <Route path="/addareas" element={<Addareas />} />
        <Route path="/editarea/*" element={<Editareas />} />
        <Route path="/editbug/*" element={<Editbug />} />
        <Route path="/addnewbug" element={<Addbug />} />
        <Route path="/searchresult" element={<Searchresult />} />
        <Route path="/export-areas" element={<Exports />} />
        <Route path="/getemployees" element={<Employees />} />
        <Route path="/updateemployee/*" element={<Editemployee />} />
        <Route path="/searchbug" element={<Searchbug />} />
        <Route path="/getprogram" element={<Getprogram />} />
        <Route path="/updateprogram/*" element={<Editprogram />} />

        {/* Define other routes for edit/add areas, add programs, etc. */}
      </Routes>
    </Router>
  );
};

export default App;
