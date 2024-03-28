import React, { ChangeEvent, useState } from "react";
import Navbar from '../Commom/Navbar'
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const AddCcrAdminTeam = () => {
  const accessToken = Cookies.get("accessToken");
  const [error, setError] = useState({ message: "" });
  const [ccrAdminName,setCcrAdminName] = useState("");
  const [ccrAdminEmail, setCcrAdminEmail] = useState("");
  const [ccrAdminPhone, setCcrAdminPhone] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === "ccrAdminName") setCcrAdminName(value);
    else if (name === "ccrAdminEmail") setCcrAdminEmail(value);
    else if (name === "ccrAdminPhone") setCcrAdminPhone(value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (
      !ccrAdminName ||
      !ccrAdminEmail ||
      !ccrAdminPhone
    ) {
      setError({ message: "Please fill out all required fields." });
      return;
    }
    try {
      const response = await axios.post(
        `/api/v1/ccrAdminSignup`,
        {
          userName: ccrAdminName,
          email: ccrAdminEmail,
          phoneNumber: ccrAdminPhone,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("CCR Admin Registration successful");
    } catch (err) {
      setError({ message: "An error occurred during registration" });
    }
  };

  return (
    <>
      <Navbar />
      <div>

          <div style={{color:"red"}}>
            {
              error.message &&(
                <Typography variant='body1'>{error.message}</Typography>
              )
            }
          </div>
          <form className="loginForm">
            <div className="candidatefield">
                <input
                  className="candreg"
                  placeholder="CCR Admin Name"
                  type="text"
                  required
                  style={{marginBottom: "20px"}}
                  value={ccrAdminName}
                  onChange={handleChange}
                  name="ccrAdminName"
                />
                 <input
                  className="candreg"
                  placeholder="CCR Admin Email"
                  type="text"
                  required
                  style={{marginBottom: "20px"}}
                  value={ccrAdminEmail}
                  onChange={handleChange}
                  name="ccrAdminEmail"
                />
                <input
                  className="candreg"
                  placeholder="CCR Admin Phone"
                  type="text"
                  required
                  style={{marginBottom: "20px"}}
                  value={ccrAdminPhone}
                  onChange={handleChange}
                  name="ccrAdminPhone"
                />
                <button className="candregbtn" onClick={handleSubmit}>
            Register CCR Admin
          </button>
              </div>
              
          </form>
      </div>

    </>
  )
}

export default AddCcrAdminTeam;