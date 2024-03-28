import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SuggestionModal1 from "../Modals/SuggestionModal1";
import Navbar from "../Commom/Navbar";

const RecruiterCommentSuggestions = () => {
  interface Comments {
    commentId: number;
    commentContent: String;
    suggestionContent: String;
    candidate: {
      candidateName: String;
    };
    recruiter: {
      recruiterName: String;
    };
  }

  const [comments, setComments] = useState<Comments[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [triggerEffect, setTriggerEffect] = useState(false);
  const navigate = useNavigate();

  // Function to show the popup with a message
  const showPopupMessage = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const handleSuggestion = (commentId1: number) => {
    let a = String(commentId1);
    localStorage.setItem("commentId", a);
    setShowPopup(true);
  };

  const closePopup = () => {
    // navigate("/newRequest");
    setShowPopup(false);
  };

  const goToRecruiterDashboard = (commentId: number, newComment: String) => {
    setShowPopup(false);
    axios
      .post(
        `http://localhost:8080/newComment?commentId=${commentId}&comment=${newComment}`
      )
      .then((response) => {
        setTriggerEffect((prevTrigger) => !prevTrigger);
        alert("New comment saved");
      })
      .catch((error) => console.error("Error fetching questions:", error));
  };

  useEffect(() => {
    let recruiterId = localStorage.getItem("recruiterId");
    axios
      .get(
        `http://localhost:8080/suggestionFromHradmin?recruiterId=${recruiterId}`
      )
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, [triggerEffect]);

  return (
    <>
      <Navbar />
      <h4 style={{ textAlign: "center" }}>Suggestion Request</h4>

      {showPopup && (
        <SuggestionModal1
          message={popupMessage}
          onClose={closePopup}
          goToRecruiterDashboard={goToRecruiterDashboard}
        />
      )}
      <Table
        sx={{ maxWidth: 500 }}
        aria-label="simple table"
        className="historyTableTable"
      >
        <TableHead className="historyTableHead">
          <TableRow>
            <TableCell align="center">
              <b>
                <h4>Candidate Name</h4>
              </b>
            </TableCell>
            <TableCell align="center">
              <b>
                <h4>old Comment</h4>
              </b>
            </TableCell>
            <TableCell align="center">
              <b>
                <h4>Suggestion</h4>
              </b>
            </TableCell>
            <TableCell align="center">
              <b>
                <h4>Add new comment</h4>
              </b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.map((item, index) => (
            <TableRow>
              <TableCell>
                <b>{item.candidate.candidateName}</b>
              </TableCell>
              <TableCell>
                <b>{item.commentContent}</b>
              </TableCell>
              <TableCell>
                <b>{item.suggestionContent}</b>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleSuggestion(item.commentId)}
                  style={{ color: "green" }}
                >
                  New comment
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default RecruiterCommentSuggestions;
