import React, { useState} from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

interface CalculatedScore{
  averageScore : number;
  candidateId : number;
  recruiterId : number;
}

const SavedResponse = () => {
  const navigate = useNavigate();
  const [interview, setInterview] = useState<CalculatedScore[]>([]);

  const goToRecruiterDashboard = () => {
    navigate("/recruiterDashbord");
  };
  return (
    <div
      style={{
        width: "40%",
        textAlign: "center",
        minHeight: "200px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "30px",

        padding: "0px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "1em",
        marginBottom: "10px",
      }}
    >
      <h1>Responses Saved Successfully</h1>
      <p>Thank you for submitting your responses</p>
      <button onClick={goToRecruiterDashboard} style={{ marginTop: "20px" }}>
        {" "}
        Go Recruiter Home Page
      </button>
    </div>
  );
};

export default SavedResponse;
