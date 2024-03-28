import React, { useEffect, useState } from "react";
import Navbar from "../Commom/Navbar";
import axios from "axios";
import "./score.css";

interface Category {
  categoryId: number;
  categoryName: string;
  averageScore: number;
}

const ViewScore = () => {
  let candidateName = localStorage.getItem("candidateName");
  let candidateId = localStorage.getItem("candidateId");
  const [score, setScore] = useState(0);
  const [category, setCategory] = useState<Category[]>([]);
  useEffect(() => {
    // Fetch categories separately
    axios
      .post(`http://localhost:8080/getCandidateAverageScore`, {
        candidateId: candidateId,
      })
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
      .post(`http://localhost:8080/getCandidateAverageScoreCategory`, {
        candidateId: candidateId,
      })
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

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <h4>Welcome {candidateName}</h4>
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
