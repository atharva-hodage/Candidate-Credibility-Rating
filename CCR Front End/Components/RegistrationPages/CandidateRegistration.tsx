import React, { useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Navbar from "../Commom/Navbar";
import "../RegistrationPages/RegistrationPagesCss.css";

const CandidateRegistration = () => {
  const [candidateName, setCandidateName] = useState("");
  const [candidateAadhar, setCandidateAadhar] = useState("");
  const [candidateDob, setCandidateDob] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidatePassword, setCandidatePassword] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");

  const [candidateImage, setCandidateImage] = useState<File | null>(null);


  const [error, setError] = useState({ message: "" });

  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === "candidateName") setCandidateName(value);
    else if (name === "candidateAadhar") setCandidateAadhar(value);
    else if (name === "candidateDob") setCandidateDob(value);
    else if (name === "candidateEmail") setCandidateEmail(value);
    else if (name === "candidatePassword") setCandidatePassword(value);
    else if (name === "candidatePhone") setCandidatePhone(value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  
    if (
      !candidateName ||
      !candidateAadhar ||
      !candidateDob ||
      !candidateEmail ||
      !candidatePassword ||
      !candidatePhone ||
      !candidateImage
    ) {
      setError({ message: "Please fill out all required fields." });
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("userName", candidateName);
      formData.append("candidateAadhar", candidateAadhar);
      formData.append("candidateDob", candidateDob);
      formData.append("phoneNumber", candidatePhone);
      formData.append("email", candidateEmail);
      formData.append("password", candidatePassword);
      formData.append("imageData", candidateImage);
  
      const response = await axios.post(`/api/v1/candidateSignup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        
        },
      });
  
      alert("Candidate Registration successful");
      navigate("/loginForm");
    } catch (err) {
      setError({ message: "An error occurred during registration" });
    }
  };
  
  return (
    <>
  
      <div className="container-candidate">
        {/* <Typography
          style={{ fontFamily: "'Poppins', sans-serif" }}
          variant="h4"
          gutterBottom
        >
          Candidate Registration Form
        </Typography> */}
        <div style={{ color: "red" }}>
          {error.message && (
            <Typography variant="body1">{error.message}</Typography>
          )}
        </div>
        <form className="loginForm">
          <div className="candidatefield">
            <div className="grid-left">
              <input
                className="candreg"
                placeholder=" Name"
                type="text"
                required
                style={{ marginBottom: "20px" }}
                value={candidateName}
                onChange={handleChange}
                name="candidateName"
              />
              <input
                className="candreg"
                placeholder=" Aadhar"
                type="text"
                required
                style={{ marginBottom: "20px" }}
                value={candidateAadhar}
                onChange={handleChange}
                name="candidateAadhar"
              />
              <input
                className="candreg"
                placeholder=" Date Of Birth"
                type="text"
                required
                style={{ marginBottom: "20px" }}
                value={candidateDob}
                onChange={handleChange}
                name="candidateDob"
              />
            </div>
            <div className="grid-right">
              <input
                className="candreg"
                placeholder=" Email"
                type="text"
                required
                style={{ marginBottom: "20px" }}
                value={candidateEmail}
                onChange={handleChange}
                name="candidateEmail"
              />
              <input
                placeholder=" Password"
                type="password"
                className="styled-inputcandidatepassword"
                style={{ marginBottom: "20px" }}
                value={candidatePassword}
                onChange={handleChange}
                name="candidatePassword"
              />
              <input
                className="candreg"
                type="text"
                style={{ marginBottom: "20px" }}
                placeholder="Phone"
                value={candidatePhone}
                onChange={handleChange}
                name="candidatePhone"
              />

<input
  type="file"
  accept="image/*"
  style={{ marginBottom: "20px" }}
  onChange={(e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setCandidateImage(files[0]);
    }
  }}
/>


            </div>

          </div>
          <button className="candregbtn" onClick={handleSubmit}>
            Register
          </button>
        </form>
      </div>
    </>
  );
};
export default CandidateRegistration;
