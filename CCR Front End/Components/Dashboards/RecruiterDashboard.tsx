import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./DashboardCss.css";
import Navbar from "../Commom/Navbar";
import JobRoleDropDown from "./JobRoleDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";
import "./notificationBox.css";
import "./RecruiterDash.css"; 
const RecruiterDashboard = () => {
  let addedPower = localStorage.getItem("addedPower");
  let userIdString = localStorage.getItem("userId");
  let userId = userIdString !== null ? parseInt(userIdString, 10) : 0;
  const accessToken = Cookies.get("accessToken");

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  let name = localStorage.getItem("userName");
  useEffect(() => {
 
    try {
      const response = axios
        .get(`/getUpdates?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data)
          setNotifications(response.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", padding: "30px" }}>
      <div className="container">
        <h3 className="heading">Recruiter Dashboard</h3>
        <h4 className="welcomeText">Welcome, {name}</h4>
      </div>
      </div>
      <div
        style={{
          textAlign: "right",
          paddingRight: "30px",
          paddingTop: "10px",
        }}
      >
        <FontAwesomeIcon
          icon={faBell}
          size="lg"
          onClick={handleNotificationClick}
        />
        {showNotifications && ( 
           <div className="notificationBox">
          <div style={{ marginTop: "10px" }}>
            {notifications && notifications.length > 0 ? (
              <ul>
                 {notifications.map((notification: any, index: number) => (
                  <li key={index}>#{notification.notification}</li>
                ))}
              </ul>
            ) : (
              <p>No notifications</p>
            )}
          </div>
          </div>
        )}
      </div>
      <div className="buttonContainer">
      {addedPower === "true" && (
        <div style={{ textAlign: "center", padding: "30px" }}>
          <Link to="/addRecruiter">
            <button className="divButton"> Add Recruiter</button>
          </Link>
        </div>
      )}

<div className="container">
        <JobRoleDropDown />
      </div>

</div>
<div className="buttonRow">
        <Link to="/candidateSearch">
          <button className="divButton">Search A Candidate</button>
        </Link>

        <Link to="/inReviewCandidates">
          <button className="divButton">In Review Candidates</button>
        </Link>
        <Link to="/todayJoiningCandidate">
          <button className="divButton">Today's Joining Candidate</button>
        </Link>
        <Link to="/recruiterCommentSuggestion">
          <button className="divButton">Suggestion</button>
        </Link>
      </div>
      &nbsp;
        <Link to="/logout">
          {" "}
          <button className="divButton">Logout</button>
        </Link>
    </>
  );
};

export default RecruiterDashboard;
