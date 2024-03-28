import React from "react";
import { Link } from "react-router-dom";
import "./DashboardCss.css";
import Navbar from "../Commom/Navbar";
import JobRoleDropDown from "./JobRoleDropDown";

const RecruiterDashboard = () => {
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", padding: "30px" }}>
        <h3>Recruiter Dashboard</h3>
      </div>
      <div></div>

      <div style={{ textAlign: "center", padding: "30px" }}>
        <JobRoleDropDown />
      </div>

      <div style={{ textAlign: "center", padding: "30px" }}>
        <Link to="/candidateSearch">
          {" "}
          <button className="divButton"> Search A Candidate</button>
        </Link>
        &nbsp;
      </div>
    </>
  );
};

export default RecruiterDashboard;
