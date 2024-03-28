import React, { useState } from "react";
import CandidateRegistration from "./CandidateRegistration";
import CompanyRecruiterRegistration from "./CompanyRecruiterRegistration";
import "../RegistrationPages/RegistrationForm.css";
import Navbar from "../Commom/Navbar";

const RegistrationForm = () => {
  const [registrationType, setRegistrationType] = useState("candidate");

  const handleToggle = (type: React.SetStateAction<string>) => {
    setRegistrationType(type);
  };

  return (
    <>
      <Navbar />
      <div>
        <div style={{ textAlign: "center" }}>
          <button
            className={`registration-button ${
              registrationType === "candidate"
                ? "toggled-button"
                : "untoggled-button"
            }`}
            onClick={() => handleToggle("candidate")}
          >
            Candidate Registration
          </button>
          <button
            className={`registration-button ${
              registrationType === "companyRecruiter"
                ? "toggled-button"
                : "untoggled-button"
            }`}
            onClick={() => handleToggle("companyRecruiter")}
          >
            Company & Recruiter Registration
          </button>
        </div>
        {registrationType === "candidate" && <CandidateRegistration />}
        {registrationType === "companyRecruiter" && (
          <CompanyRecruiterRegistration />
        )}
      </div>
    </>
  );
};

export default RegistrationForm;
