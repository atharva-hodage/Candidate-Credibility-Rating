import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useReactToPrint } from "react-to-print";

interface Candidate {
  candidateId: number;
  candidateAadhar: number;
  candidateDob: string;
  candidateAvgScore: number | null;
  user: {
    userName: string;
    email: string;
    phoneNumber: number;
  };
}

const AllCandidateListForCcrAdmin = () => {
  const accessToken = Cookies.get("accessToken");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const componentPDF= useRef(null);
  
  useEffect(() => {
    // Make an HTTP request to fetch the candidate data
    axios
      .get("/getAllCandidateList", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCandidates(response.data);
      });
  }, []);

  const generatePDF= useReactToPrint({
    content: ()=>componentPDF.current,
    documentTitle:"Userdata",
    onAfterPrint:()=>alert("Data saved in PDF")
});

  return(
    <>
    {/* <Navbar /> */}
      <div>
      <h1>Candidate List</h1>
      <button className="btn btn-success" onClick={ generatePDF}>PDF</button> 
      <div ref={componentPDF} style={{width:'100%'}}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Average Score</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.candidateId}>
              <td>{candidate.user.userName}</td>
              <td>{candidate.candidateDob}</td>
              <td>{candidate.candidateAvgScore ?? 'N/A'}</td>
              <td>{candidate.user.email}</td>
              <td>{candidate.user.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
  ) ;
};

export default AllCandidateListForCcrAdmin;
