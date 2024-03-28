import { Link } from 'react-router-dom' ;

const CandidateProfile = ({ candidateInfo }) => {

  const handleRatingFormClick = () => {
    localStorage.setItem('candidateAadhar', candidateInfo.candidateAadhar);
    window.location.href = '/recruiterRatingForm';
  }
  return (
    <>
    <div>

      <div className="candidate-box1">
      <p>
        <b> Full Name :</b> {candidateInfo.candidateName}
        <br /><br />
        <b> Aadhar Number :</b> {candidateInfo.candidateAadhar}
        <br /><br />
        <b> Email ID :</b> {candidateInfo.candidateEmail}
        <br /><br />
        <b> Contact :</b> {candidateInfo.candidatePhone}
        <br /><br />
        <b> Date Of Birth :</b> {candidateInfo.candidateDob}
        <br /><br />
        {/* <b> Average Score :</b> {candidateInfo.candidateAvgScore}
        <br /><br /> */}
        <div className='lastButtons'>
       <Link to='/historyOfCandidate'><button>History</button></Link>
       <button> Current Status </button>
       <Link to='/recruiterRatingForm'><button > Rating Form </button></Link>
       </div>
      </p>
      </div>

    </div>
    </>
  );
};

export default CandidateProfile;
