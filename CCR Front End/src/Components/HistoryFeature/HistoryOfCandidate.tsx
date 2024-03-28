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

interface Candidate {
  candidateId: number;
  candidateName: string;
}
interface Company{
  companyName : String
}
interface Recruiter{
  recruiterId : number;
  company:Company;
}
interface CalculatedScore {
  interviewScore: number;
  interviewId: number;
  jobRole: String;
  candidate: Candidate;
  recruiter: Recruiter;
}

interface Candidate {
  candidateId: number,
}

const HistoryOfCandidate = () => {
  // const [candidateHistory, setCandidateHistory] = useState("");
  // const [candidate, setCandidate] = useState<Candidate>({});
  const [history, setHistory] = useState<CalculatedScore[]>([]);

  let candidateLocalId = localStorage.getItem("candidateId");

  useEffect(() => {
    // Replace with your Spring Boot API endpoint
    axios
      .post(`http://localhost:8080/getHistoryCandidate`, {
        candidateId: candidateLocalId,
      })
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="divAboveHistoryTable">
        <h3>History Of Candidate</h3>
      </div>
      <TableContainer component={Paper} className="historyTableContainer">
        <Table
          sx={{ maxWidth: 500 }}
          aria-label="simple table"
          className="historyTableTable"
        >
          <TableHead className="historyTableHead">
            <TableRow >
              <TableCell align="center">Company Name</TableCell>
              <TableCell align="center">Job Role</TableCell>
              <TableCell align="center">Interview Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell  scope="row">
                  {item.recruiter.company.companyName}
                </TableCell>
                <TableCell align="right">{item.jobRole}</TableCell>
                <TableCell align="right">{item.interviewScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HistoryOfCandidate;
