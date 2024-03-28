import React from "react";
import { Link } from "react-router-dom";

import "./DashboardCss.css";
import Navbar from "../Commom/Navbar";

const CcrAdminDashboard = () => {
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", padding: "30px" }}>
        <h3>CCR Admin Dashboard</h3>
      </div>
      <div style={{ textAlign: "center", padding: "30px" }}>
        <Link to="/ccrAdminRatingForm">
          {" "}
          <button className="divButton"> Update Rating Form </button>
        </Link>
        &nbsp;
        &nbsp;
        &nbsp;
        <Link to="/viewCompany">
          
          <button className="divButton"> Registered Companies </button>
        </Link>
       
      </div>
      <div style={{ textAlign: "center", padding: "30px" }}>
        <Link to="/newcompanyregistrationRequest">
          {" "}
          <button className="divButton">New Registration Request</button>
        </Link>
        &nbsp;
      </div>
      <br/><br/>
      <div style={{ textAlign: "center", padding: "30px" }}>
        <Link to="/logout">
          {" "}
          <button className="divButton">Logout</button>
        </Link>
        &nbsp;
      </div>
    </> 
    
  );
};

export default CcrAdminDashboard
