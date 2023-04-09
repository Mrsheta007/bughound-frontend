import React, { useState, useEffect } from "react";
import axios from "axios";

function AddBug() {
  const [programs, setPrograms] = useState([]);
  const [programid, setProgramid] = useState([]);
  const [reportTypes, setReportTypes] = useState([
    "coding error",
    "design error",
    "hardware error",
    "suggestion",
  ]);
  const [severities, setSeverities] = useState(["fatal", "severe", "minor"]);

  const [status, setStatus] = useState(["open", "close"]);
  const [resolution, setResolution] = useState(["Fixed", "working", "pending"]);
  const [resolution_version, setResolutionversion] = useState([
    "1.1.1",
    "1.1.2",
    "1.1.3",
  ]);
  const [treat_as, settreat_as] = useState(["yes", "no"]);
  const [priority, setPriority] = useState([1, 2, 3]);
  const [problem, setProblem] = useState("");
  const [formValues, setFormValues] = useState({
    program: "",
    reportType: "",
    severity: "",
    problem: "",
  });
  const [employees, setEmployees] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    //Retrieve the list of programs from the database
    axios.get("https://bughound-backend.vercel.app/getprograms").then((res) => {
      //console.log("this is the output:-------->>>", res.data);
      setPrograms(res.data);
    });
  }, []);

  useEffect(() => {
    if (formValues.program) {
      axios
        .get(
          `https://bughound-backend.vercel.app/getareas/${formValues.program}`
        )
        .then((res) => {
          //console.log("this is the output:-------->>>", res.data);
          setAreas(res.data);
        });
    }
  }, [formValues.program]);

  //setProgramid(programs.id);

  useEffect(() => {
    //Retrieve the list of programs from the database
    axios
      .get("https://bughound-backend.vercel.app/getemployees")
      .then((res) => {
        //console.log("this is the output:-------->>>", res.data);
        setEmployees(res.data);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    console.log(
      "We have added the bug:::::::::::::::::::::::::::::::::::::::::::::::::",
      formValues
    );
    event.preventDefault();
    // TODO: submit form data to MySQL database

    axios
      .post("https://bughound-backend.vercel.app/addbug", formValues)
      .then((res) => {
        console.log("This data is Added:", formValues);
        // TODO: show success message to user
      })
      .catch((err) => {
        console.error(err);
        // TODO: show error message to user
      });
    setFormValues({
      reportTypes: "",
    });
    //window.location.reload();
  };

  return (
    <div style={{ marginTop: "50px", marginLeft: "50px", marginRight: "50px" }}>
      <div style={{ border: "1px solid black", padding: "10px" }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="program">Program:</label>

            <select
              id="program"
              name="program"
              value={formValues.program}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "10px" }}
            >
              <option value="">Select a program</option>
              {programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>

            <label htmlFor="reportType"> Report Type:</label>
            <select
              id="reportType"
              name="reportType"
              value={formValues.reportType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a report type</option>
              {reportTypes.map((reportType) => (
                <option key={reportType} value={reportType}>
                  {reportType}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="severity">Severity:</label>
            <select
              id="severity"
              name="severity"
              value={formValues.severity}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "10px" }}
            >
              <option value="">Select a severity</option>
              {severities.map((severity) => (
                <option key={severity} value={severity}>
                  {severity}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="problem">Problem:</label>
            <textarea
              id="problem"
              name="problem"
              value={formValues.problem}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "10px" }}
            />
          </div>

          <div>
            <label htmlFor="problemSummary">Problem Summary:</label>
            <input
              type="text"
              id="problemSummary"
              name="problemSummary"
              value={formValues.problemSummary}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "10px" }}
            />
          </div>

          <div>
            <label htmlFor="reportedBy">Reported By:</label>
            <select
              id="reportedBy"
              name="reportedBy"
              value={formValues.reportedBy}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "10px" }}
            >
              <option value="">Select a name</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>

            <label htmlFor="date"> Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formValues.date}
              onChange={handleInputChange}
            />
          </div>
          <hr />
          <div>
            <label htmlFor="area">Functional Area:</label>
            <select
              id="area"
              name="area"
              value={formValues.area}
              onChange={handleInputChange}
              style={{ marginBottom: "10px" }}
            >
              <option value="">Select an area</option>
              {areas.map((area) => (
                <option key={area.area_id} value={area.area_id}>
                  {area.area_name}
                </option>
              ))}
            </select>

            <label htmlFor="Assigned To"> Assigned To:</label>
            <select
              id="assignedto"
              name="assignedto"
              value={formValues.assignedto}
              onChange={handleInputChange}
            >
              <option value="">Select a name</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="comments">comments:</label>
            <textarea
              id="comments"
              name="comments"
              value={formValues.comments}
              onChange={handleInputChange}
              style={{ marginBottom: "10px" }}
            />
          </div>
          <div>
            <label htmlFor="status">status:</label>
            <select
              id="status"
              name="status"
              value={formValues.status}
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
              value={formValues.priority}
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
              value={formValues.resolution}
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
          </div>

          <div>
            <label htmlFor="resolution version">resolution version:</label>
            <select
              id="resolution_version"
              name="resolution_version"
              value={formValues.resolution_version}
              onChange={handleInputChange}
              style={{ marginBottom: "10px" }}
            >
              <option value="">select</option>
              {resolution_version.map((resolution_version) => (
                <option key={resolution_version} value={resolution_version}>
                  {resolution_version}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="Treated as?">Treat as?:</label>
            <select
              id="treat_as"
              name="treat_as"
              value={formValues.treat_as}
              onChange={handleInputChange}
            >
              <option value="">select</option>
              {treat_as.map((treat_as) => (
                <option key={treat_as} value={treat_as}>
                  {treat_as}
                </option>
              ))}
            </select>

            <label htmlFor="ResolvedBy"> Resolved By:</label>
            <select
              id="ResolvedBy"
              name="ResolvedBy"
              value={formValues.ResolvedBy}
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
          </div>
          <div>
            <label htmlFor="resolveddate">Resolved Date:</label>
            <input
              type="date"
              id="resdate"
              name="resdate"
              value={formValues.res_date}
              onChange={handleInputChange}
              style={{ marginBottom: "10px" }}
            />

            <label htmlFor="TestedBy"> Tested By:</label>
            <select
              id="TestedBy"
              name="TestedBy"
              value={formValues.TestedBy}
              onChange={handleInputChange}
            >
              <option value="">Select a name</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Submit</button>
          <button type="button" onClick={() => window.location.reload()}>
            Reset
          </button>
          <button type="button" onClick={() => window.location.reload()}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBug;
