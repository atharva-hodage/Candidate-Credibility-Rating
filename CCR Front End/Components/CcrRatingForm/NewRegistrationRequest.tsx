import React, { ReactNode, useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Navbar from "../Commom/Navbar";
import "./NewRegistrationRequest.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface Company {
  companyName: string;
  companyAddress: string;
  companyTan: number;
  companyPhoneNumber: number;
  companyId: number;
}

interface User {
  userName: string;
  username: string;
  phoneNumber: number;
}

interface Recruiter {
  userName: string;
  email: string;
  phoneNumber: number;
}

interface CompanyRecruiter {
  recruiter: Recruiter;
  company: Company;
  user: User;
}

const NewRegistrationRequest = () => {
  const accessToken = Cookies.get("accessToken");
  console.log("Access Token:", accessToken);

  const [comRecruiters, setComRecruiters] = useState<CompanyRecruiter[]>([]);
  const [approvedCompanies, setApprovedCompanies] = useState<CompanyRecruiter[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/getCompanyRecruiter`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setComRecruiters(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleApproveClick = (companyId: number) => {
    const accessToken = Cookies.get("accessToken");

    axios
      .put(
        `/approveRegistration?companyId=${companyId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Registration Approved");
        alert("Registration Request Approved");
      })
      .catch((error) => {
        console.error("Error approving registration:", error);
      });
  };

  const handleRejectClick = (companyId: number) => {
    const accessToken = Cookies.get("accessToken");

    axios
      .put(
        `/rejectRegistration?companyId=${companyId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Registration Rejected");
        alert("Registration Request Rejected");
      })
      .catch((error) => {
        console.error("Error rejecting registration: ", error);
      });
  };

  const handleViewClick = (item: CompanyRecruiter) => {
    handleApproveClick(item.company.companyId);
    handleRejectClick(item.company.companyId);
    console.log("View clicked for:", item);
  };

  return (
    <>
      <Navbar />
      <div className="Body">
        <div className="">
          <h3 style={{ textAlign: "center", fontWeight: "bolder" }}>
            New Company Registration Request
          </h3>
        </div>
        <TableContainer component={Paper} className="TableContainer">
          <Table aria-label="simple table" className="TableTable">
            <TableHead className="TableHead">
              {
                <TableRow>
                  <TableCell scope="row" align="center">
                    <b>
                      <h4>Company Name</h4>
                    </b>
                  </TableCell>
                  <TableCell align="right">
                    <b>
                      <h4>Recruiter Name </h4>
                    </b>
                  </TableCell>
                  <TableCell align="right">
                    <b>
                      <h4>Company Address </h4>
                    </b>
                  </TableCell>
                  <TableCell align="right">
                    <b>
                      <h4>Company Tan </h4>
                    </b>
                  </TableCell>
                  <TableCell align="right">
                    <b>
                      <h4>Company Phone</h4>
                    </b>
                  </TableCell>
                  <TableCell align="right">
                    <b>
                      <h4>Recruiter Email</h4>
                    </b>
                  </TableCell>
                  <TableCell align="right">
                    <b>
                      <h4>Recruiter Phone</h4>
                    </b>
                  </TableCell>
                  <TableCell align="right">
                    <b>
                      <h4>Actions</h4>
                    </b>
                  </TableCell>
                </TableRow>
              }
            </TableHead>
            <TableBody>
              {comRecruiters.map((item, index) => (
                <TableRow key={index}>
                  <TableCell scope="row">
                    <b>{item.company?.companyName}</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>{item.user?.userName}</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>{item.company?.companyAddress}</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>{item.company?.companyTan}</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>{item.company?.companyPhoneNumber}</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>{item.user?.username}</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>{item.user?.phoneNumber}</b>
                  </TableCell>
                  <TableCell align="right">
                    <div className="button-container">
                      <button
                        className="approve-button"
                        onClick={() =>
                          handleApproveClick(item.company.companyId)
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="reject-button"
                        onClick={() =>
                          handleRejectClick(item.company.companyId)
                        }
                      >
                        Reject
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default NewRegistrationRequest;
