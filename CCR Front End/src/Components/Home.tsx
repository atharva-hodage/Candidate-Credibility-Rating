import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Navbar from "./Commom/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <p className="heading">Welcome to CCR POC</p>
        <Link to="/candidateLogin">
          {" "}
          <button>Candidate Login</button>
        </Link>
        &nbsp;
        <Link to="/recruiterLogin">
          <button>Recruiter Login</button>
        </Link>
        &nbsp;
        <Link to="/ccrAdminLogin">
          <button>CCR Admin Login</button>
        </Link>
      </div>
      <div style={{ textAlign: "center", padding: "30px" }}>
        <Link to="/companyrecruiterRegistration">
          <button>Company Registration</button>
        </Link>
      </div>
      <div style={{ textAlign: "center", padding: "30px" }}>
        <Link to="/candidateRegistration">
          <button>Candidate Registration</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
