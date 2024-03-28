import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const JoiningDetailsForm = () => {
  const userId = localStorage.getItem("userId");
  const interviewId = localStorage.getItem("interviewId");
  const [status, setStatus] = useState<string>("");
  const [joiningDate, setJoiningDate] = useState<Date | string>("");
  const accessToken = Cookies.get("accessToken");

  const handleButtonClick = (status: string) => {
    setStatus(status);
  };

  const handleJoiningDate = (e: string) => {
    const parsedDate = new Date(e);
    setJoiningDate(parsedDate);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `/hiredNotHiredForm`,
        {
          interviewId: interviewId,
          hiringStatus: status,
          joiningDate: status === "HIRED" ? joiningDate : null,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data);
      console.log("Status Updated Successfully");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    if (status === "NOT HIRED" || status === "IN REVIEW") {
      handleSubmit();
    }
  }, [status]);

  return (
    <div>
      <br />
      <div>
        <button onClick={() => handleButtonClick("HIRED")}> Hired </button>
        <br /> <br />
        <button onClick={() => handleButtonClick("NOT HIRED")}>
          Not Hired
        </button>
        <br /> <br />
        <button onClick={() => handleButtonClick("IN REVIEW")}>
          In Review
        </button>
        <br /> <br />
      </div>
      {status === "HIRED" && (
        <div>
          <form>
            <label>
              Expected Joining Date?
              <input
                type="date"
                onChange={(e) => handleJoiningDate(e.target.value)}
                required
              />
            </label>
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default JoiningDetailsForm;
