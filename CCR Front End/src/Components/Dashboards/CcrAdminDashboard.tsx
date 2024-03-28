import React from 'react'
import { Link } from 'react-router-dom' ;
import Navbar from '../Commom/Navbar';
import './DashboardCss.css';


const CcrAdminDashboard = () => {
  return (
    <>
    <Navbar/>
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h3>CCR Admin Dashboard</h3>
    </div>
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <Link to='/ccrAdminRatingForm'> <button className='divButton'> Update Rating Form </button></Link>&nbsp;
      
     
    
    </div>
    </>
  )
}

export default CcrAdminDashboard;