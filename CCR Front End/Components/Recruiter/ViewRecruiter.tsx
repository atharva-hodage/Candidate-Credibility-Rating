import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Navbar from "../Commom/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
interface UserInfo {

  addedPower: boolean,
  approvePower: boolean
  user: User

} interface User {
  userName: String;
  email: String
}



function ViewRecruiter() {
  const [history, setHistory] = useState<UserInfo[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const accessToken = Cookies.get("accessToken");
  let userIdString = localStorage.getItem("userId");
  let userId = userIdString !== null ? parseInt(userIdString, 10) : 0;
  useEffect(() => {
    // Replace with your Spring Boot API endpoint
    const response = axios
      .post(
        `/addedByRecruiter`,
        {
          userId: userId
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      .then((response) => {
        setHistory(response.data)

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const handleSave = (index: number) => {
    console.log(userId)
    // Update the addedPower and approvePower values in the backend
    const updatedHistory = [...history];
    const data = updatedHistory[index];
    axios
      .put(
        `/updatePowers?userId=${userId}`,
        {
          //userId: userId,
          addedPower: data.addedPower,
          approvePower: data.approvePower,
          user: {
            email: data.user.email

          }
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setHistory(updatedHistory);
        setEditingRow(null);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
  const handleCancel = (index: number) => {
    // Cancel the editing mode
    setEditingRow(null);
  };

  const handleEdit = (index: number) => {
    // Enable editing mode for a particular row
    setEditingRow(index);
  };

  const handleDelete = (index: number) => {
    // Delete the corresponding recruiter data
    //API not done
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
  };

  const handleAddedPowerChange = (index: number, value: boolean, value1: String) => {
    const updatedHistory = [...history];
    updatedHistory[index].addedPower = value;
    updatedHistory[index].user.email = value1;
    setHistory(updatedHistory);
  };

  const handleApprovePowerChange = (index: number, value: boolean, value1: String) => {
    const updatedHistory = [...history];
    updatedHistory[index].approvePower = value;
    updatedHistory[index].user.email = value1;
    setHistory(updatedHistory);
  };

  return (

    <>
      <Navbar />
      <div className="divAboveHistoryTable">
        <h3>View Recruiters</h3>
      </div>
      <TableContainer component={Paper} className="historyTableContainer">
        <Table

          aria-label="simple table"
          className="historyTableTable"
        >
          <TableHead className="historyTableHead">
            <TableRow>
              <TableCell align="center">
                <b>
                  <h4>Recruiter Name</h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>Recruiter Email</h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>Added power</h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>approve power </h4>
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
            {history.map((item, index) => (

              <TableRow key={index}>
                <TableCell scope="row">
                  <b>{item.user.userName}</b>
                </TableCell>
                <TableCell align="right">
                  <b>{item.user.email}</b>
                </TableCell>
                <TableCell align="right">
                  {editingRow === index ? (
                    <input
                      type="checkbox"
                      checked={item.addedPower === true}
                      onChange={() =>
                        handleAddedPowerChange(index, !item.addedPower, item.user.email)
                      }
                    />
                  ) : (
                    <b>{item.addedPower === true ? 'True' : 'False'}</b>
                  )}
                </TableCell>
                <TableCell align="right">
                  {editingRow === index ? (
                    <input
                      type="checkbox"
                      checked={item.approvePower === true}
                      onChange={() =>
                        handleApprovePowerChange(index, !item.approvePower, item.user.email)
                      }
                    />
                  ) : (
                    <b>{item.approvePower === true ? 'True' : 'False'}</b>
                  )}
                </TableCell>
                <TableCell align="right">
                  {editingRow === index ? (
                    <>
                      <button style={{
                        color: "green",
                        background: "none",
                        border: "1px solid green",
                        borderRadius: "4px",
                      }} onClick={() => handleSave(index)}>
                        <FontAwesomeIcon icon={faSave} />
                      </button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <button style={{
                        color: "blue",
                        background: "none",
                        border: "1px solid blue",
                        borderRadius: "4px",
                      }} onClick={() => handleCancel(index)}>
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button style={{
                        color: "green",
                        background: "none",
                        border: "1px solid green",
                        borderRadius: "4px",
                      }} onClick={() => handleEdit(index)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <button style={{
                        color: "red",
                        background: "none",
                        border: "1px solid red",
                        borderRadius: "4px",
                      }}



                        onClick={() => {
                          if (window.confirm('Are you sure to delete this recruiter?'))
                            handleDelete(index)
                        }}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ViewRecruiter