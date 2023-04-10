import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Searchingbug() {
  const [program, setprogram] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState([]);
  const [program_name, setprogramname] = useState([]);
  const [status, setStatus] = useState(["open", "close"]);
  const [report_type, setReportTypes] = useState([
    "coding error",
    "design error",
    "hardware error",
    "suggestion",
  ]);
  const [program_id, setprogramid] = useState([]);
  const [priority, setPriority] = useState([1, 2, 3]);
  const [area, setAreas] = useState([]);
  const [resolution, setResolution] = useState(["Fixed", "working", "pending"]);
  const [resolution_version, setResolutionversion] = useState([
    "1.1.1",
    "1.1.2",
    "1.1.3",
  ]);
  const [problem, setproblem] = useState([]);
  const [treat_as, settreat_as] = useState(["yes", "no"]);
  const [severity, setSeverities] = useState(["fatal", "severe", "minor"]);
  const [res_date, set_resdate] = useState([]);

  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    //Retrieve the list of programs from the database
    axios
      .get("https://bughound-backend.vercel.app/getemployees")
      .then((res) => {
        //console.log("this is the output:-------->>>", res.data);
        setEmployees(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://bughound-backend.vercel.app/getareas/${program_id}`)
      .then((res) => {
        setAreas(res.data);
      });
  }, [program_id]);

  useEffect(() => {
    //Retrieve the list of programs from the database
    axios.get("https://bughound-backend.vercel.app/getprograms").then((res) => {
      console.log(
        "this is the output from backend for the all programs:-------->>>",
        res.data
      );
      setprogram(res.data);
    });
  }, []);

  useEffect(() => {
    //Retrieve the list of programs from the database
    axios.get("https://bughound-backend.vercel.app/getareas").then((res) => {
      console.log(
        "this is the output from backend for the all areas:-------->>>",
        res.data
      );
      setAreas(res.data);
    });
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("this is what we are passing to the backend", formData);
    axios
      .post(`https://bughound-backend.vercel.app/searchbugfrommenu`, formData)
      .then((res) => {
        console.log(
          "this is the out put of serach bug from the menu:",
          res.data
        );
        setBugs(res.data);

        // TODO: show success message to user
      })
      .catch((err) => {
        console.error(err);
        // TODO: show error message to user
      });

    //window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} name="fname">
      <label for="fname">
        <b>Edit bug report</b>
      </label>

      <br></br>

      <label htmlFor="Program"> Program:</label>
      <select
        id="program"
        name="program"
        value={formData.program}
        onChange={handleInputChange}
      >
        <option value="">Select</option>
        {program.map((program) => (
          <option key={program.id} value={program.id}>
            {program.name}
          </option>
        ))}
      </select>

      <label htmlFor="report_type"> Report Type:</label>
      <select
        id="report_type"
        name="report_type"
        value={formData.report_type}
        onChange={handleInputChange}
      >
        <option value="">Select a report type</option>
        {report_type.map((report_type) => (
          <option key={report_type} value={report_type}>
            {report_type}
          </option>
        ))}
      </select>

      <div>
        <label htmlFor="severity">Severity:</label>
        <select
          id="severity"
          name="severity"
          value={formData.severity}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        >
          <option value="">Select a severity</option>
          {severity.map((severity) => (
            <option key={severity} value={severity}>
              {severity}
            </option>
          ))}
        </select>
      </div>

      <label htmlFor="area">Functional Area:</label>
      <select
        id="area"
        name="area"
        value={formData.area}
        onChange={handleInputChange}
        style={{ marginBottom: "10px" }}
      >
        <option value="">Select an area</option>
        {area.map((area) => (
          <option key={area.area_id} value={area.area_id}>
            {area.area_name}
          </option>
        ))}
      </select>

      <label htmlFor="reported_by">Reported By:</label>
      <select
        id="reported_by"
        name="reported_by"
        value={formData.reported_by}
        onChange={handleInputChange}
        style={{ marginBottom: "10px" }}
      >
        <option value="">Select a name</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>

      <label htmlFor="Assigned To"> Assigned To:</label>
      <select
        id="assigned_to"
        name="assigned_to"
        value={formData.assigned_to}
        onChange={handleInputChange}
      >
        <option value="">Select a name</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>
      <label htmlFor="status">status:</label>
      <select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleInputChange}
      >
        <option value="">select</option>
        {status.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <label htmlFor="priority"> priority:</label>
      <select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleInputChange}
      >
        <option value="">select</option>
        {priority.map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </select>

      <label htmlFor="resolution"> resolution:</label>
      <select
        id="resolution"
        name="resolution"
        value={formData.resolution}
        onChange={handleInputChange}
        style={{ marginBottom: "10px" }}
      >
        <option value="">select</option>
        {resolution.map((resolution) => (
          <option key={resolution} value={resolution}>
            {resolution}
          </option>
        ))}
      </select>

      <div></div>
      <button type="submit">search</button>
      <button type="button" onClick={() => window.location.reload()}>
        Reset
      </button>
      <button type="button" onClick={() => window.location.reload()}>
        Cancel
      </button>

      <div></div>

      <table>
        <thead>
          <tr>
            <th>ID</th>

            <th>Report Type</th>
            <th>Severity</th>
            <th>Problem</th>
            <th>Problem Summary</th>

            <th>Comments</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Resolution</th>

            <th>Treat As</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug) => (
            <tr key={bug.id}>
              <td>{bug.id}</td>

              <td>{bug.report_type}</td>
              <td>{bug.severity}</td>
              <td>{bug.problem}</td>
              <td>{bug.problem_summary}</td>

              <td>{bug.comments}</td>
              <td>{bug.status}</td>
              <td>{bug.priority}</td>
              <td>{bug.resolution}</td>

              <td>{bug.treat_as}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
}
export default Searchingbug;
