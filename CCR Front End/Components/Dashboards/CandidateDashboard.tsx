import React from "react";
import { Link } from "react-router-dom";
import Navbar2 from "../Commom/Navbar";

import "./DashboardCss.css";
import Navbar from "../Commom/Navbar";
// let ccrAdminEmail1 = localStorage.getItem("ccrAdminEmail");
const CandidateDashboard = () => {
  let candidateName = localStorage.getItem("userName");

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", padding: "30px" }}>
        <h5>Welcome {candidateName}</h5>
        <h3>Candidate Dashboard</h3>
      </div>
      <div style={{ textAlign: "center", padding: "30px" }}>
        <Link to="/viewScore">
          {" "}
          <button className="divButton"> View Score</button>
        </Link>
        &nbsp;
        <Link to="/logout">
          {" "}
          <button className="divButton">Logout</button>
        </Link>
        &nbsp;
        <Link to="/speedometer">
          {" "}
          <button className="divButton">View Speedometer</button>
        </Link>
      </div>
    </>
  );
};

export default CandidateDashboard;
