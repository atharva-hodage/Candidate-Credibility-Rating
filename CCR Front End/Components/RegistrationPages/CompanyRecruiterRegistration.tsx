import React, { useState } from "react";
import { Button, Stepper, Step, StepLabel } from "@mui/material";
import axios from "axios";
import Navbar from "../Commom/Navbar";
import "../RegistrationPages/comrecRegistration.css";
import { useNavigate } from "react-router-dom";
import PopupModal from "../Modals/PopupModal ";
import Cookies from "js-cookie";

const CompanyRecruiterRegistration = () => {
  const accessToken = Cookies.get("accessToken");
  const [activeStep, setActiveStep] = useState(0);

  const isStepValid = () => {
    if (activeStep === 0) {
      return (
        companyName.trim() !== "" &&
        companyTan.trim() !== "" &&
        companyPhone.trim() !== "" &&
        companyAddress.trim() !== ""
      );
    } else if (activeStep === 1) {
      return (
        recruiterName.trim() !== "" &&
        recruiterEmail.trim() !== "" &&
        recruiterPassword.trim() !== "" &&
        recruiterPhone.trim() !== ""
      );
    }
    return true;
  };

  const handleNext = () => {
    if (isStepValid()) {
      setActiveStep(activeStep + 1);
    } else {
      alert("Please fill out all fields before proceeding.");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const steps = ["Company Details", "Recruiter Details"];
  const [companyNameError, setCompanyNameError] = useState("");
  const [companyTanError, setCompanyTanError] = useState("");
  const [companyPhoneError, setCompanyPhoneError] = useState("");
  const [companyAddressError, setCompanyAddressError] = useState("");
  const [recruiterNameError, setRecruiterNameError] = useState("");
  const [recruiterEmailError, setRecruiterEmailError] = useState("");
  const [recruiterPasswordError, setRecruiterPasswordError] = useState("");
  const [recruiterPhoneError, setRecruiterPhoneError] = useState("");

  const [recruiterName, setRecruiterName] = useState("");
  const [recruiterEmail, setRecruiterEmail] = useState("");
  const [recruiterPassword, setRecruiterPassword] = useState("");
  const [recruiterPhone, setRecruiterPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyTan, setCompanyTan] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string>(""); // Specify the type as string

  // Function to show the popup with a message
  const showPopupMessage = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const closePopup = () => {
    navigate("/companyrecruiterRegistration ");
    setShowPopup(false);
  };

  const goToRecruiterDashboard = () => {
    navigate("/loginForm");
  };
  const validateCompanyDetails = () => {
    if (companyName.trim() === "") {
      setCompanyNameError("Company Name is required");
    } else {
      setCompanyNameError("");
    }

    if (companyTan.trim() === "") {
      setCompanyTanError("Company TAN is required");
    } else {
      setCompanyTanError("");
    }

    if (companyPhone.trim() === "") {
      setCompanyPhoneError("Company Phone is required");
    } else if (!/^\d{10}$/.test(companyPhone)) {
      setCompanyPhoneError("Invalid phone number");
    } else {
      setCompanyPhoneError("");
    }

    if (companyAddress.trim() === "") {
      setCompanyAddressError("Company Address is required");
    } else {
      setCompanyAddressError("");
    }
  };

  const validateRecruiterDetails = () => {
    if (recruiterName.trim() === "") {
      setRecruiterNameError("Name is required");
    } else {
      setRecruiterNameError("");
    }

    if (recruiterEmail.trim() === "") {
      setRecruiterEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(recruiterEmail)) {
      setRecruiterEmailError("Invalid email address");
    } else {
      setRecruiterEmailError("");
    }

    if (recruiterPassword.trim() === "") {
      setRecruiterPasswordError("*Password is required");
    } else if (recruiterPassword.length < 3) {
      setRecruiterPasswordError("Password must be at least 6 characters");
    } else {
      setRecruiterPasswordError("");
    }

    if (recruiterPhone.trim() === "") {
      setRecruiterPhoneError("Phone is required");
    } else {
      setRecruiterPhoneError("");
    }
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setShowPopup(true);
    e.preventDefault();

    if (activeStep === 0) {
      validateCompanyDetails();
    } else if (activeStep === 1) {
      validateRecruiterDetails();
    }

    console.log("Form Data:", {
      company: {
        companyName: companyName,
        companyAddress: companyAddress,
        companyPhone: companyPhone,
        companyTan: companyTan,
      },
      recruiter: {
        recruiterName: recruiterName,
        recruiterPhone: recruiterPhone,
        recruiterEmail: recruiterEmail,
        recruiterPassword: recruiterPassword,
      },
    });

    try {
      showPopupMessage("Company Registered Sucessfully...!");

      const response = await axios.post(
        `/api/v1/hrAdminSignup`,
        {
          userName: recruiterName,
          phoneNumber: parseInt(recruiterPhone),
          email: recruiterEmail,
          password: recruiterPassword,
          

          companyName: companyName,
          companyAddress: companyAddress,
          ccompanyPhone: parseInt(companyPhone),
          companyTan: parseInt(companyTan),
        }
      );
    

      if (response.status === 201) {
         navigate("/loginForm");
        // window.location.reload();
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {showPopup && (
        <PopupModal
          message={popupMessage}
          onClose={closePopup}
          goToRecruiterDashboard={goToRecruiterDashboard}
        />
      )}
      {/* <div style={{ textAlign: "center", marginTop: "10px" }}>
        <h1>Company Registration</h1>
      </div> */}
      <div className="container">
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step key="Company Details">
            <StepLabel>Company Details</StepLabel>
          </Step>
          <Step key="Recruiter Details">
            <StepLabel>Recruiter Details</StepLabel>
          </Step>
        </Stepper>

        <div className="form">
          {activeStep === 0 && (
            <div className="step">
              <input
                placeholder="Company Name"
                type="text"
                required
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <div className="error-message">{companyNameError}</div> <br></br>
              <input
                type="text"
                placeholder="Company TAN"
                id="companyTAN"
                value={companyTan}
                onChange={(e) => setCompanyTan(e.target.value)}
              />
              <div className="error-message">{companyTanError}</div> <br></br>
              <input
                type="text"
                placeholder="Company Phone"
                id="companyPhone"
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
              />
              <div className="error-message">{companyPhoneError}</div> <br></br>
              <input
                type="text"
                placeholder="Company Address"
                id="companyAddress"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
              />
              <div className="error-message">{companyAddressError}</div>{" "}
              <br></br>
            </div>
          )}

          {activeStep === 1 && (
            <div className="step">
              <input
                placeholder="Name"
                type="text"
                id="recruiterName"
                value={recruiterName}
                onChange={(e) => setRecruiterName(e.target.value)}
              />
              <div className="error-message">{recruiterNameError}</div>{" "}
              <br></br>
              <input
                type="text"
                placeholder="Email"
                id="recruiterEmail"
                value={recruiterEmail}
                onChange={(e) => setRecruiterEmail(e.target.value)}
              />
              <div className="error-message">{recruiterEmailError}</div>{" "}
              <br></br>
              <input
                placeholder="Password"
                type="password"
                className="styled-inputpassword"
                id="recruiterPassword"
                value={recruiterPassword}
                onChange={(e) => setRecruiterPassword(e.target.value)}
              />
              <div className="error-message-password">
                {recruiterPasswordError}
              </div>{" "}
              <br></br>
              <input
                type="text"
                id="recruiterPhone"
                placeholder="Phone"
                value={recruiterPhone}
                onChange={(e) => setRecruiterPhone(e.target.value)}
              />
              <div className="error-message">{recruiterPhoneError}</div>{" "}
              <br></br>
            </div>
          )}

          <div className="button-container">
            {activeStep !== 0 && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleBack}
              >
                Back
              </Button>
            )}

            {activeStep !== 1 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                style={{ marginLeft: "auto" }}
              >
                Next
              </Button>
            )}

            {activeStep === 1 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Register
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyRecruiterRegistration;
