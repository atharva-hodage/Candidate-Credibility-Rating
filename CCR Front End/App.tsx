import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandidateRegistration from "./Components/RegistrationPages/CandidateRegistration";
import CcrAdminDashboard from "./Components/Dashboards/CcrAdminDashboard";
import CandidateDashboard from "./Components/Dashboards/CandidateDashboard";
import Rating from "./Components/CcrRatingForm/Rating";
import ViewScore from "./Components/Candidate/ViewScore";
import RecruiterDashboard from "./Components/Dashboards/RecruiterDashboard";
import Home from "./Components/Home";
import RecruiterRatingForm from "./Components/RatingForm/RecruiterRatingForm";
import RecruiterRating from "./Components/RatingForm/RecruiterRating";
import SavedResponse from "./Components/RatingForm/SavedResponse";
import HistoryOfCandidate from "./Components/HistoryFeature/HistoryOfCandidate";
import CompanyRecruiterRegistration from "./Components/RegistrationPages/CompanyRecruiterRegistration";
import SavedCompany from "./Components/RegistrationPages/SavedCompany";
import HRadminDashboard from "./Components/Dashboards/HRadminDashboard";
import AddRecruiter from "./Components/Recruiter/AddRecruiter";
import CandidateData from "./Components/Candidate/CandidateData";
import EnterEmail from "./Components/OTP Validation/EnterEmail";
import EnterOTP from "./Components/OTP Validation/EnterOTP";
import ChangePasswordOTP from "./Components/OTP Validation/ChangePasswordOTP";
import CandidateSearch from "./Components/Candidate/CandidateSearch";
import CandidateProfileNew from "./Components/Candidate/CandidateProfileNew";
import NewRegistrationRequest from "./Components/CcrRatingForm/NewRegistrationRequest";
import RegistrationForm from "./Components/RegistrationPages/RegistrationForm";
import LoginForm from "./Components/LoginPages/LoginForm";
import RecruiterCommentSuggestion from "./Components/Recruiter/RecruiterCommentSuggestions";
import NewCommentRequest from "./Components/RatingForm/NewCommentRequest";
import SuperAdminDashboard from "./Components/Dashboards/SuperAdminDashboard";
import AddCcrAdminTeam from "./Components/SuperAdmin/AddCcrAdminTeam";
import ViewRecruiter from "./Components/Recruiter/ViewRecruiter";
import ViewCompany from "./Components/CCRADMIN/ViewCompany";
import AllCandidateListForCcrAdmin from "./Components/CcrRatingForm/AllCandidateListForCcrAdmin";
import ViewCcrAdminTeam from "./Components/SuperAdmin/ViewCcrAdminTeam";
import Drawer from "./Components/Commom/Drawer";
import Logout from "./Components/SignOut/Logout";

import NotificationComponent from "./Components/NotificationComponent";
import GetApprover from "./Components/Recruiter/GetApprover";
import SpeedometerScore from "./Components/Candidate/SpeedometerScore";
import JoiningDetailsForm from "./HiredNotHiredForm/JoiningDetailsForm";
import InReviewCandidates from "./Components/Recruiter/InReviewCandidates";
import TodayJoiningCandidate from "./Components/Recruiter/TodayJoiningCandidate";
import UploadImage from "./Components/UploadImage";
import CCRIMG from "./CCRIMG";

const App: React.FC = () => {

  return (
    
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
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />

    


          {/* DashBoard Screens */}
          <Route path="/recruiterDashbord" element={<RecruiterDashboard />} />
          <Route path="/ccrAdminDashboard" element={<CcrAdminDashboard />} />
          <Route path="/candidateDashboard" element={<CandidateDashboard />} />
          <Route path="/hradminDashboard" element={<HRadminDashboard />} />
          <Route path="/superAdminDashboard" element={<SuperAdminDashboard />}/>

          {/* Super Admin Screens */}
          <Route path="addCcrAdminTeam" element={<AddCcrAdminTeam />}/>
          <Route path="viewCcrAdminTeam" element={<ViewCcrAdminTeam />}/>


            {/* CCR Admin Screen */}

            <Route path="allCandidateListForCcrAdmin" element={<AllCandidateListForCcrAdmin/>}/>

          {/* Candidate Profile Screens */}
          <Route path="viewScore" element={<ViewScore />} />
          <Route path="candidateData" element={<CandidateData />} />

          {/* Recruiter Profile Screens */}
          <Route path="recruiterRatingForm" element={<RecruiterRatingForm />} />
          <Route path="hiredNothiredForm" element={<JoiningDetailsForm />} />
          <Route path="inReviewCandidates" element={<InReviewCandidates />} />
          <Route path="todayJoiningCandidate" element={<TodayJoiningCandidate />} />



          <Route path="candidateSearch" element={<CandidateSearch />} />
          <Route path="candidateProfileNew" element={<CandidateProfileNew />} />

          <Route path="savedResponse" element={<SavedResponse />} />
          <Route path="historyOfCandidate" element={<HistoryOfCandidate />} />

          <Route path="ccrAdminRatingForm" element={<Rating />} />
          <Route path="drawer" element={<Drawer />}/>
          <Route path="viewCompany" element={<ViewCompany />} />



          
          <Route path="recRate" element={<RecruiterRating />} />
          <Route path="addRecruiter" element={<AddRecruiter />} />
          <Route path="viewRecruiter" element={<ViewRecruiter />} />
          <Route path="getApprover" element={<GetApprover/>}/>
          <Route path="uploadI" element={<UploadImage/>}/>
          <Route path="uploadd" element={<CCRIMG/>}/>


      
          <Route
            path="recruiterCommentSuggestion"
            element={<RecruiterCommentSuggestion />}
          />
          <Route path="newcommentRequest" element={<NewCommentRequest />} />
          

          <Route
            path="newcompanyregistrationRequest"
            element={<NewRegistrationRequest />}
          />

          <Route path="commonregistrationForm" element={<RegistrationForm />} />

          {/* OTP Validation Forgot Password */}
          <Route path="enterEmail" element={<EnterEmail />} />
          <Route path="enterOtp" element={<EnterOTP />} />
          <Route path="changePasswordOtp" element={<ChangePasswordOTP />} />

          <Route path="notification" element={<NotificationComponent />} />

          <Route path="speedometer" element={<SpeedometerScore/>}/>
        </Routes>
      </BrowserRouter>

  );
};

export default App;
