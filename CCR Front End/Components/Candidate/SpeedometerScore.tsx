import React, { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { render } from "react-dom";
import axios from "axios";
import Cookies from "js-cookie";
// Import react-circular-progressbar module and styles
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./score1.css";
import Navbar from "../Commom/Navbar";

interface Category {
  categoryId: number;
  categoryName: string;
  averageScore: number;
}

const SpeedometerScore = () => {
  const accessToken = Cookies.get("accessToken");
  let userName = localStorage.getItem("candidateName");
  let userId = localStorage.getItem("userId");

  const [score, setScore] = useState(0);
  const [category, setCategory] = useState<Category[]>([]);
  useEffect(() => {
    // Fetch categories separately
    axios
      .post(
        "/getCandidateAverageScore",
        {
            userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(
        (response) => {
        //   console.log(response.data);
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
            userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(
        (response) => {
        //   console.log(response.data);
          setCategory(response.data);
        },
        (error) => {
          console.log(error);
          alert("error");
        }
      );
  }, []);
  return (
        <>
        <Navbar />
        <div style={{ textAlign: "center" }}>
        <h4>Welcome {userName}</h4>
        </div>
        <h2>Your CategoryWise scores are:  </h2>
        <div className="viewScoreGraphs">
        {category.map((cat) => (
          <div key={cat.categoryId} className="circularprogressbar">
            <div className="circularbox">
              <CircularProgressbar
                value={cat.averageScore}
                text={`${cat.averageScore}%`}
              />
            </div>
            <div className="circularboxCategoryName">{cat.categoryName}</div>
          </div>
        ))}
        </div>
      </>
  );
};

export default SpeedometerScore;
