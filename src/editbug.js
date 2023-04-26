import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Editbug() {
  const location = useLocation();
  const [file, setFile] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const bugid = searchParams.get("bug_id");
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
  const [res, setResponse] = useState([]);

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
      .get(`https://bughound-backend.vercel.app/getbug/${bugid}`)
      .then((res) => {
        ///setFormData(res.data[0]);

        const withoutdate = new Date(res.data[0].date);
        const date = withoutdate.toISOString().slice(0, 10);

        const withoutresdate = new Date(res.data[0].date);
        const resdate = withoutresdate.toISOString().slice(0, 10);

        const {
          report_type,
          reported_by,

          problem_summary,
          severity,
          problem,
          area,
          comments,
          status,
          priority,
          resolution,
          resolution_version,
          treat_as,
          resolved_by,

          tested_by,
        } = res.data[0];

        //console.log("what is res.data[0]", res.data[0]);

        //console.log("what is res.data", res.data);
        setFormData({
          report_type,
          reported_by,
          date,
          problem_summary,
          severity,
          problem,
          area,
          comments,
          status,
          priority,
          resolution,
          resolution_version,
          treat_as,
          resolved_by,
          resdate,
          tested_by,
        });
        //setFormData({ reported_by: res.data[0].reported_by });
        //setFormData({ date: res.data[0].date });
      });
  }, [bugid]);

  useEffect(() => {
    axios
      .get(`https://bughound-backend.vercel.app/getoneprogram/${bugid}`)
      .then((res) => {
        setprogramname(res.data[0].name);
        setprogramid(res.data[0].id);
        //console.log("working on this:------------------:", res.data[0]);

        //console.log("##########################", res.data[0].name);

        //setFormData({ problem_summary: res.data[0].problem_summary }, {});
        //setFormData({ reported_by: res.data[0].reported_by });
        //setFormData({ date: res.data[0].date });
      });
  }, [bugid]);

  useEffect(() => {
    axios
      .get(`https://bughound-backend.vercel.app/getareas/${program_id}`)
      .then((res) => {
        setAreas(res.data);
      });
  }, [program_id]);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(
          `https://bughound-backend.vercel.app/api/getfiles/${bugid}`
        );
        if (response.data.length > 0) {
          setFile(response.data[0]);
          console.log("we are here---------------------------");
        }
      } catch (error) {
        console.log("this is erro:-----------------");
        //console.log(error);
      }
    };

    fetchFile();
  }, [bugid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: submit form data to MySQL database
    // console.log(
    //   "this is date-------------*************------------:",
    //   formData.date
    // );

    // console.log(
    //   "this is res----date-------------*************------------:",
    //   formData.resdate
    // );

    if (formData.res_date == undefined) {
      formData.resdate = null;
    } else {
      formData.resdate = formData.resdate.slice(10);
    }

    if (formData.date == undefined) {
      formData.date = null;
    } else {
      console.log("this is else of the date");
      const dateObj = new Date(formData.date);
      const formattedDate = dateObj.toISOString().slice(0, 10);
      formData.date = formattedDate;
    }
    axios
      .put(`https://bughound-backend.vercel.app/editbug/${bugid}`, formData)
      .then((res) => {
        console.log(res.data);
        setResponse(res.data);
        // TODO: show success message to user
      })
      .catch((err) => {
        setResponse(res.data);
        console.error(err);
        // TODO: show error message to user
      });
    console.log("this is the data:+++++++++++++", bugid);
    const formDatas = new FormData();
    formDatas.append("bug_id", bugid);
    formDatas.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formDatas
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    //window.location.reload();
  };

  const handleDownload = async (bugid) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/filesdownload/${bugid}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", response.headers["x-filename"]);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: "50px", marginLeft: "50px", marginRight: "50px" }}>
      <div style={{ border: "1px solid black", padding: "10px" }}>
        <form onSubmit={handleSubmit} name="fname">
          <label>
            //file upload may not work on server as the website is hosted under
            free hosting plan
          </label>
          <br></br>
          <label for="fname">
            <b>Edit bug report</b>
          </label>

          <br></br>
          <div>
            <label htmlFor="program">Program:</label>

            <input
              id="program"
              name="program"
              value={program_name}
              style={{ marginBottom: "10px", marginTop: "10px" }}
            />

            <label htmlFor="report_type"> Report Type:</label>
            <select
              id="report_type"
              name="report_type"
              value={formData.report_type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a report type</option>
              {report_type.map((report_type) => (
                <option key={report_type} value={report_type}>
                  {report_type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="severity">Severity:</label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleInputChange}
              required
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

          <div>
            <label htmlFor="problem">Problem:</label>
            <textarea
              id="problem"
              name="problem"
              value={formData.problem}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "10px" }}
            />
          </div>

          <div>
            <label htmlFor="problemSummary">Problem Summary:</label>
            <input
              type="text"
              id="problem_summary"
              name="problem_summary"
              value={formData.problem_summary}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "10px" }}
            />
          </div>

          <label htmlFor="reported_by">Reported By:</label>
          <select
            id="reported_by"
            name="reported_by"
            value={formData.reported_by}
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
          <div>
            <label htmlFor="date"> Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
          <hr />
          <div>
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
          </div>

          <div>
            <label htmlFor="comments">comments:</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              style={{ marginBottom: "10px" }}
            />
          </div>
          <div>
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
          </div>

          <div>
            <label htmlFor="resolution version">resolution version:</label>
            <select
              id="resolution_version"
              name="resolution_version"
              value={formData.resolution_version}
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
              value={formData.treat_as}
              onChange={handleInputChange}
            >
              <option value="">select</option>
              {treat_as.map((treat_as) => (
                <option key={treat_as} value={treat_as}>
                  {treat_as}
                </option>
              ))}
            </select>

            <label htmlFor="resolved_by"> Resolved By:</label>
            <select
              id="resolved_by"
              name="resolved_by"
              value={formData.resolved_by}
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
              value={formData.resdate}
              onChange={handleInputChange}
              style={{ marginBottom: "10px" }}
            />

            <label htmlFor="tested_by"> Tested By:</label>
            <select
              id="tested_by"
              name="tested_by"
              value={formData.tested_by}
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

          <label>
            Select a file:
            <input type="file" name="file" onChange={handleFileChange} />
          </label>
          <br />

          <button type="submit">Edit</button>
          <p>{res}</p>
          <button type="button" onClick={() => window.location.reload()}>
            Reset
          </button>
          <button type="button" onClick={() => window.location.reload()}>
            Cancel
          </button>

          <div></div>
        </form>

        {file && (
          <div>
            <p>{file.name}</p>
            <button onClick={() => handleDownload(file.id)}>Download</button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Editbug;
