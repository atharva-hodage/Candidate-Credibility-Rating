import React from 'react'
import { Link } from "react-router-dom";
import Navbar from "../Commom/Navbar";
import "./DashboardCss.css";

const SuperAdminDashboard = () => {
  return (
    <>
    <Navbar />
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h3>Super Admin Dashboard</h3>
    </div>
    <div style={{ textAlign: "center", padding: "30px" }}>
      <Link to="/addCcrAdminTeam">
        {" "}
        <button className="divButton"> Add CCR Admin Team </button>
      </Link>
      &nbsp;
    </div>
    <div style={{ textAlign: "center", padding: "30px" }}>
      <Link to="/viewCcrAdminTeam">
        {" "}
        <button className="divButton"> View CCR Admin Team </button>
      </Link>
      &nbsp;
    </div>
  </>
  )
}

export default SuperAdminDashboard;