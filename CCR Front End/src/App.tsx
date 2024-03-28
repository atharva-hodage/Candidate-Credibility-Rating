import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandidateLogin from "./Components/LoginPages/CandidateLogin";
import CandidateRegistration from "./Components/RegistrationPages/CandidateRegistration";
import RecruiterLogin from "./Components/LoginPages/RecruiterLogin";
import CcrAdminLogin from "./Components/LoginPages/CcrAdminLogin";
import CcrAdminDashboard from "./Components/Dashboards/CcrAdminDashboard";
import CandidateDashboard from "./Components/Dashboards/CandidateDashboard";
import Rating from "./Components/CcrRatingForm/Rating";
import ViewScore from "./Components/Candidate/ViewScore";
import RecruiterDashboard from "./Components/Dashboards/RecruiterDashboard";
import CandidateSearch from "./Components/Candidate/CandidateSearch";
import Home from "./Components/Home";
import RecruiterRatingForm from "./Components/RatingForm/RecruiterRatingForm";
import RecruiterRating from "./Components/RatingForm/RecruiterRating";
import SavedResponse from "./Components/RatingForm/SavedResponse";
import HistoryOfCandidate from "./Components/HistoryFeature/HistoryOfCandidate";
import CompanyRecruiterRegistration from "./Components/RegistrationPages/CompanyRecruiterRegistration";
import SavedCompany from "./Components/RegistrationPages/SavedCompany";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Registration Screens */}
          <Route
            path="/candidateRegistration"
            element={<CandidateRegistration />}
          />
          <Route
            path="/companyrecruiterRegistration"
            element={<CompanyRecruiterRegistration />}
          ></Route>
          <Route path="savedCompany" element={<SavedCompany />} />

          {/* Login Screens */}
          <Route path="/" element={<Home />} />
          <Route path="/candidateLogin" element={<CandidateLogin />} />
          <Route path="/recruiterLogin" element={<RecruiterLogin />} />
          <Route path="/ccrAdminLogin" element={<CcrAdminLogin />} />

          {/* DashBoard Screens */}
          <Route path="/recruiterDashbord" element={<RecruiterDashboard />} />
          <Route path="/ccrAdminDashboard" element={<CcrAdminDashboard />} />
          <Route path="/candidateDashboard" element={<CandidateDashboard />} />

          {/* Candidate Profile Screens */}
          <Route path="viewScore" element={<ViewScore />} />

          {/* Recruiter Profile Screens */}
          <Route path="recruiterRatingForm" element={<RecruiterRatingForm />} />
          <Route path="candidateSearch" element={<CandidateSearch />} />
          <Route path="savedResponse" element={<SavedResponse />} />
          <Route path="historyOfCandidate" element={<HistoryOfCandidate />} />

          <Route path="ccrAdminRatingForm" element={<Rating />} />

          <Route path="recRate" element={<RecruiterRating />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
