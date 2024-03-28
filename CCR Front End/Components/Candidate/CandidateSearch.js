import React, { useState } from "react";
import axios from "axios";
import "../Candidate/search.css";
import CandidateProfile from "./CandidateProfile";
import Navbar from "../Commom/Navbar";
import Cookies from "js-cookie";

const CandidateSearch = () => {
  const [candidateAadhar, setCandidateAadhar] = useState(null);
  const [candidateInfo, setCandidateInfo] = useState(null);
  const [showProfile, setShowProfile] = useState(false); // State variable to control profile visibility

  const handleInputChange = (e) => {
    setCandidateAadhar(e.target.value);
  };
  const accessToken = Cookies.get("accessToken");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `/candidateListByAadhar?candidate_aadhar=${candidateAadhar}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data;

      // Update the state with the fetched data
      setCandidateInfo(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/openCandidateprofileByAadhar?aadharNumber=${candidateAadhar}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data;
      console.log(data.candidateId);
      console.log(data.candidateAadhar);
      localStorage.setItem("currentCandidateId", data.candidateId);
      localStorage.setItem("currentCandidateName", data.candidateName);
      localStorage.setItem("currentCandidateEmail", data.candidateEmail);
      localStorage.setItem("currentCandidateAadhar", data.candidateAadhar);

      // Update the state with the fetched data
      setCandidateInfo(data);

      // Show the profile when the button is clicked
      setShowProfile(true);
      console.log(candidateInfo.candidateName);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="center-container">
        <h1 style={{ fontFamily: '"Poppins", sans-serif' }}>
          Candidate Search
        </h1>
        <form onSubmit={handleSubmit}>
          {/* <label >
          
          </label> */}
          <input
            className="candsearch"
            value={candidateAadhar}
            label=" Aadhar Id"
            variant="outlined"
            onChange={handleInputChange}
            placeholder="Enter candidate aadhar"
            size="small"
          />
          <button className="candsearchbtn" type="submit">
            Search Candidate
          </button>
        </form>
        {candidateInfo && (
          <div className="candidate-box">
            <div>
              <b>| Candidate Name |</b> {candidateInfo.candidateName}
              
              <b>| Candidate Email |</b> {candidateInfo.candidateEmail}
            </div>
            <div className="candidate-box-3">
              <button onClick={openProfile}>Visit Full Profile</button>
            </div>
          </div>
        )}
        {showProfile && <CandidateProfile candidateInfo={candidateInfo} />}
      </div>
    </>
  );
};

export default CandidateSearch;
