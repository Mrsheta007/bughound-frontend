import { useLocation } from "react-router-dom";

function App() {
  //console.log("this is going to be easy");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userLevel = searchParams.get("userLevel");

  return (
    <div>
      <h1>Bughound Start Page</h1>

      <nav>
        <ul>
          <li>
            <a href="/addnewbug">Enter New Bug</a>
          </li>
          <li>
            <a href="/searchresult">Update Existing Bug</a>
          </li>
          {userLevel === "admin" && (
            <li>
              <a href="/database-maintenance">Database Maintenance</a>
            </li>
          )}
          <li>
            <a href="/searchbug">search bug</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
