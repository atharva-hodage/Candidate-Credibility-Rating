import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import "./CandidateData.css";
import boyAvatar from "./../../Images/BoyAvatar.png";
import Cookies from "js-cookie";

interface CandidateInformation {
  candidateName: String;
  candidateDob: String;
  candidateEmail: String;
  candidatePhone: number;
  candidateAvgScore: number;
}
const CandidateData = () => {
  const accessToken = Cookies.get("accessToken");
  const [candidateInfo, setCandidateInfo] =
    useState<CandidateInformation | null>(null);
  let candidateAadhar = localStorage.getItem("candidateAadhar");
  useEffect(() => {
    try {
      axios
        .get(`/openCandidateprofileByAadhar?aadharNumber=${candidateAadhar}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setCandidateInfo(response.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return (
    <>
      <div className="divCandidateData">
        <Grid className="candidateDataGrid">
          <Grid className="candidateAvatarGrid">
            <img
              src={boyAvatar}
              style={{ borderRadius: 0, width: 130, height: 130, padding: 10 }}
            />
          </Grid>
          <Grid className="candidateInfoGrid">
            <Grid className="candidateInfoGridUp">
              <h4>Full Name : {candidateInfo?.candidateName} </h4>
              <h4>Aadhar Number : {candidateAadhar}</h4>
              <h4>Email Address : {candidateInfo?.candidateEmail} </h4>
            </Grid>
            <Grid className="candidateinfoGridDown">
              <h4>Phone Number : {candidateInfo?.candidatePhone} </h4>
              <h4>Date Of Birth : {candidateInfo?.candidateDob}</h4>
              <h4>Average Score : {candidateInfo?.candidateAvgScore}</h4>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default CandidateData;
