import React, { useEffect, useState } from "react";
import Navbar from "../Commom/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import "./score1.css";

interface Category {
  categoryId: number;
  categoryName: string;
  averageScore: number;
}

const ViewScore = () => {
  const accessToken = Cookies.get("accessToken");
  let candidateName = localStorage.getItem("candidateName");
  let candidateId = localStorage.getItem("userId");

  const [score, setScore] = useState(0);
  const [category, setCategory] = useState<Category[]>([]);
  useEffect(() => {
    // Fetch categories separately
    axios
      .post(
        "/getCandidateAverageScore",
        {
          userId: candidateId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(
        (response) => {
          console.log(response.data);
          setScore(response.data);
        },
        (error) => {
          console.log(error);
          alert("error");
        }
      );

    axios
      .post(
        "/getCandidateAverageScoreCategory",
        {
          userId: candidateId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(
        (response) => {
          console.log(response.data);
          setCategory(response.data);
        },
        (error) => {
          console.log(error);
          alert("error");
        }
      );
  }, []);
  const rotationAngle = (score / 100) * 90;
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <h4>Welcome {candidateName}</h4>

        {/* 
        <div className="speedometer">
          <div className="dial">
            <div
              className="needle"
              style={{
                transform: `translateX(-50%) rotate(${rotationAngle}deg)`, // Set the rotation angle
              }}
            ></div>
          </div>
          <div className="labels">
            <div className="label">0</div>
            <div className="label">20</div>
            <div className="label">40</div>
            <div className="label">60</div>
            <div className="label">80</div>
            <div className="label">100</div>
          </div>
        </div> */}

        <h2 className="score">Your CCR score is: {score} %</h2>
      </div>
      {
        <table style={{ width: "50%", margin: "0 auto" }}>
          <thead>
            <th>Category Name</th>
            <th>CategoryWise Score</th>
          </thead>
          <tbody>
            {category.map((cate) => (
              <>
                <tr>
                  <td>{cate.categoryName}</td>
                  <td>{cate.averageScore} %</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      }
    </>
  );
};

export default ViewScore;