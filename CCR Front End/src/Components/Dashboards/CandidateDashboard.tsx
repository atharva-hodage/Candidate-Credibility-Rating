import React from 'react'
import { Link } from 'react-router-dom' ;
import Navbar from '../Commom/Navbar';
import './DashboardCss.css';
let ccrAdminEmail1 = localStorage.getItem("ccrAdminEmail");
console.log(ccrAdminEmail1);
const CandidateDashboard = () => {
  let candidateName = localStorage.getItem("candidateName");
 
  return (
    <>
    <Navbar/>
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h5>Welcome {candidateName}</h5>
      <h3>Candidate Dashboard</h3>
    </div>
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <Link to='/viewScore'> <button className='divButton'> View Score</button></Link>&nbsp;
    </div>
    </>
  )
}

export default CandidateDashboard