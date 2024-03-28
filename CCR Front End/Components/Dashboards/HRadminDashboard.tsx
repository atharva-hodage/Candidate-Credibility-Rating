// HRadminDashboard.tsx

import React from "react";
import Navbar from "../Commom/Navbar";
import JobRoleDropDown from "./JobRoleDropDown";
import { Link } from "react-router-dom";
import "./hrdash.css"; // Import the CSS file

const HRadminDashboard = () => {
  let name = localStorage.getItem("userName");
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>

      <div className="container">
        <h3 className="heading">HR Admin Dashboard</h3>
        <h4 className="welcomeText">Welcome, {name}</h4>
      </div>

      <div className="buttonContainer">
        <Link to="/addRecruiter">
          <button className="divButton">Add Recruiter</button>
        </Link>

        <Link to="/viewRecruiter">
          <button className="divButton">View Recruiters</button>
        </Link>
      </div>
      <div className="buttonContainer">
      <Link to="/getApprover">
          <button className="divButton">Approver</button>
        </Link>
      </div>

      <div className="container">
        <JobRoleDropDown />
      </div>

      <div className="buttonContainer">
        <Link to="/candidateSearch">
          <button className="divButton">Search Candidates</button>
        </Link>

        <Link to="/newcommentRequest">
          <button className="divButton">New Requests</button>
        </Link>
        <Link to="/inReviewCandidates">
          <button className="divButton">In Review Candidates</button>
        </Link>
        <Link to="/todayJoiningCandidate">
          <button className="divButton">Today's Joining Candidate</button>
        </Link>
      </div>
      &nbsp;
        <Link to="/logout">
          {" "}
          <button className="divButton">Logout</button>
        </Link>
    </>
  );
};

export default HRadminDashboard;
