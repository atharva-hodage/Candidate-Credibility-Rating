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
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSave,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

interface Company {
  companyName: string;
  companyAddress: string;
  companyTan: string | number;
  companyPhoneNumber: string | number;
  companyId: string | number;
}

interface User {
  userId: string | number;
  userName: string;
  username: string;
  phoneNumber: string | number;
  createdAt: string;
}

interface Recruiter {
  userName: string;
  email: string;
  phoneNumber: string | number;
}

interface CompanyRecruiter {
  recruiter: Recruiter;
  company: Company;
  user: User;
}

const ViewCompany = () => {
  const [company, setCompany] = useState<CompanyRecruiter[]>([]);
  const accessToken = Cookies.get("accessToken");
  const [editedCompany, setEditedCompany] = useState<CompanyRecruiter | null>(
    null
  ); // Changed the type to CompanyRecruiter
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState<Partial<Company>>({});
  const [editedValues1, setEditedValues1] = useState<Partial<User>>({});
  useEffect(() => {
    axios
      .get(`/getCompanyRecruiter1`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCompany(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEdit = (company: CompanyRecruiter) => {
    setEditedCompany(company);
    setEditedValues({
      companyName: company.company.companyName,
      companyTan: company.company.companyTan,
      companyPhoneNumber: company.company.companyPhoneNumber,
      companyAddress: company.company.companyAddress,
    });
    setEditedValues1({
      userId: company.user.userId,
      userName: company.user.userName,
      username: company.user.username,
      phoneNumber: company.user.phoneNumber,
    });
    setEditMode(true);
  };

  const handleUpdate = () => {
    if (editedCompany) {
      // Send a PUT request to update the company and user data
      axios
        .put(
          `/updateCompanyByAdmin?companyName=${editedValues.companyName}&companyTan=${editedValues.companyTan}&companyAddress=${editedValues.companyAddress}&companyPhoneNumber=${editedValues.companyPhoneNumber}`,

          {
            // userId: editedCompany.user.userId,

            userId: editedValues1.userId,
            email: editedValues1.username,
            phoneNumber: editedValues1.phoneNumber,
            userName: editedValues1.userName,
          },
          // Pass the edited company data
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          // Handle the response, e.g., display a success message or update the state
          console.log("Company updated:", response.data);
          // Reset the editedCompany and editMode
          setEditedCompany(null);
          setEditMode(false);
        })
        .catch((error) => {
          console.error("Error updating company:", error);
        });
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <div className="divAboveHistoryTable">
        <h2 style={{ color: "white" }}>REGISTERED COMPANIES</h2>
      </div>
      <TableContainer component={Paper} className="historyTableContainer">
        <Table
          sx={{ maxWidth: 1300 }}
          aria-label="simple table"
          className="historyTableTable"
        >
          <TableHead className="TableHead">
            <TableRow>
              <TableCell align="center">
                <b>
                  <h4> Company </h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>Tan No.</h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>Contact </h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>Branch</h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>HR Admin</h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>HR Admin Mail</h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>HR Admin Contact</h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>Registered On</h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>Action</h4>
                </b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {company.map((item, index) => (
              <TableRow key={index}>
                <TableCell scope="row">
                  {editMode && editedCompany === item ? (
                    <input
                      type="text"
                      value={editedValues.companyName}
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          companyName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <b>{item.company.companyName}</b>
                  )}
                </TableCell>
                <TableCell scope="row">
                  {editMode && editedCompany === item ? (
                    <input
                      type="text"
                      value={editedValues.companyTan}
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          companyTan: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <b>{item.company.companyTan}</b>
                  )}
                </TableCell>
                <TableCell scope="row">
                  {editMode && editedCompany === item ? (
                    <input
                      type="text"
                      value={editedValues.companyPhoneNumber}
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          companyPhoneNumber: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <b>{item.company.companyPhoneNumber}</b>
                  )}
                </TableCell>
                <TableCell scope="row">
                  {editMode && editedCompany === item ? (
                    <input
                      type="text"
                      value={editedValues.companyAddress}
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          companyAddress: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <b>{item.company.companyAddress}</b>
                  )}
                </TableCell>

                <TableCell scope="row">
                  {editMode && editedCompany === item ? (
                    <input
                      type="text"
                      value={editedValues1.userName || item.user.userName}
                      onChange={(e) =>
                        setEditedValues1({
                          ...editedValues1,
                          userName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <b>{item.user.userName}</b>
                  )}
                </TableCell>

                <TableCell scope="row">
                  {editMode && editedCompany === item ? (
                    <input
                      type="text"
                      value={editedValues1.username || item.user.username}
                      onChange={(e) =>
                        setEditedValues1({
                          ...editedValues1,
                          username: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <b>{item.user.username}</b>
                  )}
                </TableCell>

                <TableCell scope="row">
                  {editMode && editedCompany === item ? (
                    <input
                      type="text"
                      value={editedValues1.phoneNumber || item.user.phoneNumber}
                      onChange={(e) =>
                        setEditedValues1({
                          ...editedValues1,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <b>{item.user.phoneNumber}</b>
                  )}
                </TableCell>

                <TableCell align="right">
                  <b>{new Date(item.user.createdAt).toLocaleString()}</b>
                </TableCell>

                <TableCell>
                  {editMode &&
                  editedCompany?.company.companyId ===
                    item.company.companyId ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        style={{
                          color: "green",
                          background: "none",
                          border: "1px solid green",
                          borderRadius: "4px",
                        }}
                      >
                        <FontAwesomeIcon icon={faSave} /> Save
                      </button>
                      &nbsp; &nbsp;
                      <button
                        onClick={() => {
                          setEditMode(false);
                          setEditedCompany(null);
                        }}
                        style={{
                          color: "red",
                          background: "none",
                          border: "1px solid ",
                          borderRadius: "4px",
                        }}
                      >
                        <FontAwesomeIcon icon={faTimes} /> Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(item)}
                      style={{
                        color: "green",
                        background: "none",
                        border: "1px solid green",
                        borderRadius: "4px",
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                  )}
                  &nbsp; &nbsp;
                  <button
                    style={{
                      color: "red",
                      background: "none",
                      border: "1px solid ",
                      borderRadius: "4px",
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ViewCompany;