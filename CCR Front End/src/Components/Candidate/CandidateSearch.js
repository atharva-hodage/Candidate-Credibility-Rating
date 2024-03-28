import React, { useState } from 'react';
import axios from 'axios';
import '../Candidate/search.css';
import CandidateProfile from './CandidateProfile';
import TextField from '@mui/material/TextField';
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone';
import Navbar from '../Commom/Navbar';

const CandidateSearch = () => {
  const [candidateAadhar, setCandidateAadhar] = useState('');
  const [candidateInfo, setCandidateInfo] = useState(null);
  const [showProfile, setShowProfile] = useState(false); // State variable to control profile visibility

  const handleInputChange = (e) => {
    setCandidateAadhar(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8080/candidateListByAadhar?candidate_aadhar=${candidateAadhar}`);
      const data = response.data;



      // Update the state with the fetched data
      setCandidateInfo(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const openProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/openCandidateprofileByAadhar?aadharNumber=${candidateAadhar}`);
      const data = response.data;
      console.log(data.candidateId);

      localStorage.setItem("candidateId", data.candidateId);

      // Update the state with the fetched data
      setCandidateInfo(data);

      // Show the profile when the button is clicked
      setShowProfile(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="center-container">
        <h1>Candidate Search</h1>
        <form onSubmit={handleSubmit}>
          <label >
            <TextField
              value={candidateAadhar}
              label=" Aadhar Id"
              variant="outlined"
              onChange={handleInputChange}
              placeholder='Enter candidate aadhar'
              size="small"
            />
          </label>
          <button type="submit">
            <PersonSearchTwoToneIcon fontSize='small' />Search Candidate
          </button>
        </form>
        {candidateInfo && (
          <div className="candidate-box">
            <div >
              <b>|  Candidate Name |</b> {candidateInfo.candidateName}
              <b>|  Candidate Email |</b> {candidateInfo.candidateEmail}
            </div>
            <div className='candidate-box-3'>
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
