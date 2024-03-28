import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Navbar from "../Commom/Navbar";
import "./HistoryOfCandidate.css";
import CandidateData from "../Candidate/CandidateData";
import Cookies from "js-cookie";

interface Candidate {
  candidateId: number;
  candidateName: string;
}
interface Company {
  companyName: String;
}
interface Recruiter {
  recruiterId: number;
  company: Company;
}
interface CalculatedScore {
  interviewScore: number;
  interviewId: number;
  interviewDate: String;
  jobRole: String;
  candidate: Candidate;
  recruiter: Recruiter;
}

interface Candidate {
  candidateId: number;
}

interface Comment {
  commentContent: String;
  commentApprove: boolean;

}

const HistoryOfCandidate = () => {
  const [history, setHistory] = useState<CalculatedScore[]>([]);
  const accessToken = Cookies.get("accessToken");
  let candidateLocalId = localStorage.getItem("candidateId");
  let recruiterId = localStorage.getItem("recruiterId");
  useEffect(() => {
    // Replace with your Spring Boot API endpoint
    axios
      .post(`/getHistoryCandidate`, {
        candidateId: candidateLocalId,
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setHistory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <CandidateData />
      <div className="divAboveHistoryTable">
        <h3>Interview History Of Candidate</h3>
      </div>
      <TableContainer component={Paper} className="historyTableContainer">
        <Table
          sx={{ maxWidth: 500 }}
          aria-label="simple table"
          className="historyTableTable"
        >
          <TableHead className="historyTableHead">
            <TableRow>
              <TableCell align="center">
                <b>
                  <h4>Company Name</h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>Job Role</h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>Interview Score </h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>Interview Date</h4>
                </b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item, index) => (
              <TableRow
                key={index}
              // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row">
                  <b>{item.recruiter.company.companyName}</b>
                </TableCell>
                <TableCell align="right">
                  <b>{item.jobRole}</b>
                </TableCell>
                <TableCell align="right">
                  <b>{item.interviewScore}</b>
                </TableCell>
                <TableCell align="right">
                  <b>{item.interviewDate}</b>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HistoryOfCandidate;
