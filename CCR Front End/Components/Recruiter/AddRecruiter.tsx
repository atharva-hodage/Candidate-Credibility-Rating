import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../Commom/Navbar";
import "../RegistrationPages/RegistrationPagesCss.css";
import { error } from "console";
import { Checkbox } from "@mui/material";
import AddCate from "../Modals/AddCate";
import Cookies from "js-cookie";
import Navbar from "../../src/Components/Commom/Navbar";

const AddRecruiter = () => {
  const [recruiterName, setrecruiterName] = useState("");
  const [recruiterEmail, setrecruiterEmail] = useState("");
  const [recruiterPhone, setrecruiterPhone] = useState("");
  const [addPower, setaddPower] = useState(false);
  const [approvePower, setapprovePower] = useState(false);
  const [error, setError] = useState<String | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string>("");

  const accessToken = Cookies.get("accessToken");

  // let companyId = localStorage.getItem("companyId");
  // console.log(companyId)

  // Function to show the popup with a message
  const showPopupMessage = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const closePopup = () => {
    navigate("/hradminDashboard");
    setShowPopup(false);
  };

  const goToRecruiterDashboard = () => {
    navigate("/recruiterDashbord");
  };
  const navigate = useNavigate();

  let role = localStorage.getItem("recruiterRole");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setaddPower(event.target.checked);
  };

  const handleChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    setapprovePower(event.target.checked);
  };

  const handleLogin = async () => {
    try {
      let userIdString = localStorage.getItem("userId");
      console.log(userIdString);
      // let userId = userIdString !== null ? parseInt(userIdString, 10) : 0;
      const response = await axios
        .post(
          `/api/v1/recruiterSignup`,
          {
            userId : userIdString,
            userName: recruiterName,
            phoneNumber: recruiterPhone,
            email: recruiterEmail,
            addedPower: addPower,
            approvePower: approvePower,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(
          (response) => {
            alert("Recruiter Added Sucessfully..!");
            console.log(response);
            navigate("/hradminDashboard");
          },
          (error) => {
            alert("Enter Proper Details");
          }
        );
    } catch (err) {
      setError("An error occured during the registration");
    }
  };
  return (
    <>
      <Navbar />
      {showPopup && (
        <AddCate
          message={popupMessage}
          onClose={closePopup}
          goToRecruiterDashboard={goToRecruiterDashboard}
        />
      )}

      <div>
        <Container className="container" maxWidth="sm">
          <Typography variant="h5" gutterBottom>
            <b>Add Recruiter</b>
          </Typography>

          <form className="loginForm">
            <TextField
              label="Recruiter Name"
              type="text"
              value={recruiterName}
              onChange={(e) => setrecruiterName(e.target.value)}
              style={{ marginBottom: "20px" }}
            />

            <TextField
              label="Recruiter Email"
              type="email"
              value={recruiterEmail}
              onChange={(e) => setrecruiterEmail(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
            <TextField
              label="Recruiter Phone"
              type="text"
              value={recruiterPhone}
              onChange={(e) => setrecruiterPhone(e.target.value)}
              style={{ marginBottom: "20px" }}
            />

            {role == "ROLE_HRADMIN" ? (
              <>
                Add Power:{" "}
                <Checkbox checked={addPower} onChange={handleChange} />
                Approve Power:
                <Checkbox checked={approvePower} onChange={handleChange2} />
              </>
            ) : (
              <>
                Add Power:{" "}
                <Checkbox checked={addPower} onChange={handleChange} />
              </>
            )}

            <Button color="primary" onClick={handleLogin}>
              Register
            </Button>
          </form>
        </Container>
      </div>
    </>
  );
};

export default AddRecruiter;