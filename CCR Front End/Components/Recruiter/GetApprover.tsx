import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Commom/Navbar";
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";
import { Box, Button, Container } from "@mui/material";

interface UserInfo {
  user: User

} 
interface User {
    userName: String;
    email: String;
    userId:number
    phoneNumber:number
  }

 

function GetApprover() {

    const [recruiterEmail, setrecruiterEmail] = useState("");
  const [recruiterInfo, setrecruiterInfo] = useState<UserInfo>();
  const accessToken = Cookies.get("accessToken");
  let userIdString = localStorage.getItem("userId");
  let userId = userIdString !== null ? parseInt(userIdString, 10) : 0;
 
  const [recruiterId, setRecruiterId] = useState(""); 


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = axios
      .post(
        `/findRecruiterByEmail`,
        {
          email: recruiterEmail
         
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {

        setRecruiterId(response.data.user.userId)
        setrecruiterInfo(response.data);

      })

     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit2 = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    try {
      const response = axios
      .put(
        `/changeApprover?userId=${userId}`,
        {
          email: recruiterEmail
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
    
       alert("success")
      })

     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


    return (
        <>
          <Navbar />
          <Container component="main" maxWidth="xs">
            <h1 style={{ fontFamily: '"Poppins", sans-serif' }}>
              Recruiter Search
            </h1>
            <Box
              component="form"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleSubmit(e)
              }
              noValidate
              
            >
      
              <TextField
                //margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={recruiterEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setrecruiterEmail(e.target.value)
                }
              />
              <button className="candsearchbtn" type="submit">
                Search Recruiter
              </button>
              </Box>
              </Container><br/><br/><br/>
            {recruiterInfo && (
              <div className="candidate-box">
                <div>
                  <b>Name :</b> {recruiterInfo.user.userName}<br/>
                  <b>Email :</b> {recruiterInfo.user.email}<br/>
                  <b>Phone :</b> {recruiterInfo.user.phoneNumber}
                </div>
                <Box
              component="form"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleSubmit2(e)
              }
              noValidate
              sx={{
                mt: 1,
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
                <button className="candsearchbtn" type="submit">
                Get Approve
              </button>
              </Box>
              </div>
            )} 
           

        </>
      );
}




export default GetApprover