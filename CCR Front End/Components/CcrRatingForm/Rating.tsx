import React, { useState, useEffect } from "react";
import "./RatingForm.css";
import "./RatingForm.module.css";
import Cookies from "js-cookie";

import axios, { AxiosResponse } from "axios";
// import ResponsiveAppBar from "../Commom/ResponsiveAppBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Commom/Navbar";
import { useNavigate } from "react-router-dom";
import DeleteCate from "../Modals/DeleteCate";
import AddCate from "../Modals/AddCate";

interface Question {
  questionId: number;
  questionContent: string;
  weightage: number;
  category: {
    categoryId: number;
    categoryName: string;
    categoryWeightage: number;
  };
}

const Rating: React.FC = () => {
  const accessToken = Cookies.get("accessToken");
  // console.log(accessToken)
  ///modal Windows
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string>("");

  // Function to show the popup with a message
  const showPopupMessage = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const closePopup = () => {
    navigate("/ccrAdminRatingForm");
    setShowPopup(false);
  };

  const goToRecruiterDashboard = () => {
    navigate("/recruiterDashbord");
  };
  const navigate = useNavigate();

  const [cate, setCate] = useState<string>("");
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [cate1, setCate1] = useState<Question[]>([]);
  const [categories, setCategories] = useState<
    { categoryId: number; categoryName: string; categoryWeightage: number }[]
  >([]);
  const [categoryInputs, setCategoryInputs] = useState<{
    [key: number]: string;
  }>({});
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [editingRow, setEditingRow] = useState<number | null>(null);

  const [updatedCategoryWeightages, setUpdatedCategoryWeightages] = useState<{
    [key: number]: number;
  }>({});

  const updateCategoryWeightage = (
    categoryId: number,
    newWeightage: number
  ) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.categoryId === categoryId
          ? { ...category, categoryWeightage: newWeightage }
          : category
      )
    );
  };
  const updateQuestionWeightage = (
    questionId: number,
    newWeightage: number
  ) => {
    setCate1((prevCate1) =>
      prevCate1.map((question) =>
        question.questionId === questionId
          ? { ...question, weightage: newWeightage }
          : question
      )
    );
  };
  const handleCategoryWeightageChange = (categoryId: number, value: string) => {
    const updatedWeightages = { ...updatedCategoryWeightages };
    console.log(categoryId);
    console.log(value);
    updatedWeightages[categoryId] = parseInt(value);
    setUpdatedCategoryWeightages(updatedWeightages);
  };

  const handleSaveAllCategoryWeightages = () => {
    // Calculate the total weightage of all updated categories
    const totalWeightage = Object.values(updatedCategoryWeightages).reduce(
      (acc, weightage) => acc + weightage,
      0
    );

    // Create an array of promises to update each category's weightage
    console.log(updatedCategoryWeightages);

    // Create an array of promises for each category update
    const categoryUpdates = Object.entries(updatedCategoryWeightages).map(
      ([categoryId, categoryWeightage]) => ({
        categoryId: parseInt(categoryId),
        categoryWeightage: categoryWeightage,
      })
    );

    // Send the array of category updates to the server
    axios
      .put("/updateCategories", categoryUpdates, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        // Update the category weightage in the state
        Object.entries(updatedCategoryWeightages).forEach(
          ([categoryId, newWeightage]) => {
            updateCategoryWeightage(parseInt(categoryId), newWeightage);
          }
        );

        // Clear the updated weightages after updating the state
        setUpdatedCategoryWeightages({});

        // alert("All Category Weightages Updated");
        showPopupMessage("All Category Weightages Updated");
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Failed to update one or more category weightages. Keep the total of weightages as 100"
        );
        // showPopupMessage("Failed to update one or more category weightages. Keep the total of weightages as 100");
      });
  };
  const handleEditCategory = (categoryId: number) => {
    // Find the category you want to edit
    const categoryToEdit = categories.find(
      (category) => category.categoryId === categoryId
    );
    
    if (categoryToEdit) {
      // Set the current weightage as the initial value in the input field
      setUpdatedCategoryWeightages({
        ...updatedCategoryWeightages,
        [categoryId]: categoryToEdit.categoryWeightage,
      });
    } else {
      // Handle the case where the category is not found
      console.log("Category not found");
      // You can add your error handling logic here if needed
    }
    
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCate(e.target.value);
  };

  const handleNewQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion(e.target.value);
  };

  const handleCategoryInputChange = (
    categoryId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedInputs = { ...categoryInputs };
    updatedInputs[categoryId] = e.target.value;
    setCategoryInputs(updatedInputs);
  };

  useEffect(() => {
    // Fetch categories separately
    axios
      .get(`/getAllCategories`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(
        (
          response: AxiosResponse<
            {
              categoryId: number;
              categoryName: string;
              categoryWeightage: number;
            }[]
          >
        ) => {
          // console.log(response.data);
          setCategories(response.data);
        },
        (error) => {
          console.log(error);
          alert("error");
        }
      );

    // Fetch questions separately
    axios
      .get(`/getAllQuestion`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(
        (response: AxiosResponse<Question[]>) => {
          // console.log(response.data);
          setCate1(response.data);
        },
        (error) => {
          console.log(error);
          alert("error");
        }
      );
  }, [triggerEffect]);

  const addCategory = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(
        `/createCategory`,
        {
          categoryName: cate,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(
        (response) => {
          // alert("Category Saved");
          showPopupMessage("Category Added successfully..!");

          setCategories((prevCategories) => [
            ...prevCategories,
            {
              categoryId: response.data.categoryId,
              categoryName: cate,
              categoryWeightage: response.data.categoryWeightage,
            },
          ]);
          setCate(""); // Clear the input field
          setTriggerEffect((prevTrigger) => !prevTrigger);
        },
        (error) => {
          console.log(error);
          alert("Please enter valid details.");
        }
      );
  };

  const addQuestionToCategory = (categoryId: number, categoryName: string) => {
    console.log(categoryId);
    axios
      .post(
        `/${categoryId}/addQuestion`,{questionContent:categoryInputs[categoryId]},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(
        (response) => {
          // alert("Question Saved");
          console.log(response);
          showPopupMessage("Question Added To Category");
         // Create a new Question object
          const newQuestion: Question = {
            questionId: response.data.questionId,
            questionContent: categoryInputs[categoryId],
            weightage: 0,
            category: {
              categoryId: categoryId,
              categoryName: categoryName,
              categoryWeightage: 0,
            },
          };
          setCate1((prevCate1) => [...prevCate1, newQuestion]);
          setCategoryInputs((prevInputs) => {
            const updatedInputs = { ...prevInputs };
            updatedInputs[categoryId] = ""; // Clear the input field
            return updatedInputs;
          });
          setTriggerEffect((prevTrigger) => !prevTrigger);
        },
        (error) => {
          console.log(error);

          alert("Please enter valid details.");
        }
      );
  };

  // const handleDeleteCategory = (categoryId: number) => {
  //   if (window.confirm("Are you sure you want to delete this category?")) {

  //     axios
  //       .delete(`http://localhost:8080/removeCategory?categoryId=${categoryId}`)
  //       .then(
  //         (response) => {
  //           if (response.status === 200) {

  //             setCategories((prevCategories) =>
  //               prevCategories.filter((category) => category.categoryId !== categoryId)
  //             );

  //             setCate1((prevCate1) =>
  //               prevCate1.filter((question) => question.category.categoryId !== categoryId)
  //             );
  //           } else {
  //             alert("Failed to delete category.");
  //           }setTriggerEffect((prevTrigger) => !prevTrigger);
  //         },
  //         (error) => {
  //           console.log(error);
  //           alert("Failed to delete category.");
  //         }
  //       );
  //   }
  // };

  // const handleDeleteCategory = (categoryId: number) => {
  //   // Find the category you want to delete
  //   const categoryToDelete = categories.find(
  //     (category) => category.categoryId === categoryId
  //   );

  //   if (categoryToDelete) {
  //     if (categoryToDelete.categoryWeightage === 0) {
  //       if (window.confirm("Are you sure you want to delete this category?")) {
  //         // if (window.confirm(  showPopupMessage("Category deleted successfully..!");)) {

  //         axios
  //           .delete(`/removeCategory?categoryId=${categoryId}`, {
  //             headers: {
  //               Authorization: `Bearer ${accessToken}`,
  //             },
  //           })
  //           .then(
  //             (response) => {
  //               if (response.status === 200) {
  //                 // Remove the category from the state
  //                 setCategories((prevCategories) =>
  //                   prevCategories.filter(
  //                     (category) => category.categoryId !== categoryId
  //                   )
  //                 );

  //                 // Remove questions associated with the category from the state
  //                 setCate1((prevCate1) =>
  //                   prevCate1.filter(
  //                     (question) => question.category.categoryId !== categoryId
  //                   )
  //                 );

  //                 // Trigger a re-fetch of the data to reflect the changes
  //                 setTriggerEffect((prevTrigger) => !prevTrigger);

  //                 // alert("Category deleted successfully.");
  //                 showPopupMessage("Category deleted successfully..!");
  //               } else {
  //                 // alert("Failed to delete category.");
  //                 showPopupMessage("Failed to delete category..!");
  //               }
  //             },
  //             (error) => {
  //               console.log(error);
  //               alert("Failed to delete category.");
  //             }
  //           );
  //       }
  //     } else {
  //       showPopupMessage("Category Weightage Must Be '0' Before Deletion.");
  //     }
  //   }
  // };
  const handleDeleteCategory = (categoryId: number) => {
   const categoryToDelete = categories.find(
  (category) => category.categoryId === categoryId
);
  
    if (categoryToDelete) {
      if (categoryToDelete.categoryWeightage === 0) {
        if (window.confirm("Are you sure you want to delete this category?")) {
          axios
            .delete(`/removeCategory?categoryId=${categoryId}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then(
              (response) => {
                if (response.status === 200) {
                  setCategories((prevCategories) =>
                    prevCategories.filter(
                      (category) => category.categoryId !== categoryId
                    )
                  );
  
                  setCate1((prevCate1) =>
                    prevCate1.filter(
                      (question) =>
                        question.category && question.category.categoryId !== categoryId
                    )
                  );
  
                  setTriggerEffect((prevTrigger) => !prevTrigger);
  
                  showPopupMessage("Category deleted successfully..!");
                } else {
                  showPopupMessage("Failed to delete category..!");
                }
              },
              (error) => {
                console.log(error);
                showPopupMessage("Failed to delete category.");
              }
            );
        }
      } else {
        showPopupMessage("Category Weightage Must Be '0' Before Deletion.");
      }
    } else {
      console.log("Category not found");
      // Handle the case where the category is not found.
    }
  };
  
  const handleDeleteQuestion = (questionId: number, categoryId: number) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      axios
        .delete(`/removeQuestion?questionId=${questionId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          (response) => {
            if (response.status === 200) {
              setCate1((prevCate1) =>
                prevCate1.filter(
                  (question) =>
                    question.category.categoryId !== categoryId ||
                    question.questionId !== questionId
                )
              );
            } else {
              alert("Failed to delete question.");
            }
            setTriggerEffect((prevTrigger) => !prevTrigger);
          },
          (error) => {
            console.log(error);
            alert("Failed to delete question.");
          }
        );
    }
  };

  const handleEditQuestion = (questionId: number) => {
    setEditingRow(questionId);
  };

  const handleEditInputChange = (
    questionId: number,
    e: React.ChangeEvent<HTMLInputElement>,
    field: string // 'questionContent' or 'weightage'
  ) => {
    // Update the question content or weightage in your state or temporary editing state
    const updatedQuestions = cate1.map((question) =>
      question.questionId === questionId
        ? {
            ...question,
            [field]:
              field === "weightage"
                ? parseFloat(e.target.value)
                : e.target.value,
          }
        : question
    );
    setCate1(updatedQuestions);
  };

  const handleEditWeightageChange = (
    rowIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Update the weightage in your state or temporary editing state
  };

  const handleSaveEdit = (questionId: number) => {
    // Find the edited question by its questionId
    const editedQuestion = cate1.find(
      (question) => question.questionId === questionId
    );

    if (editedQuestion) {
      const updatedWeightage = parseFloat(editedQuestion.weightage.toString()); // Convert to float

      const existingQuestions = cate1.filter(
        (q) => q.category.categoryId === editedQuestion.category.categoryId
      );

      // Calculate the new total weightage within the category after updating the question
      const totalWeightage = existingQuestions
        .map((q) =>
          q.questionId === questionId ? updatedWeightage : q.weightage
        )
        .reduce((sum, weightage) => sum + weightage, 0);

      const categoryWeightage = editedQuestion.category.categoryWeightage;

      // console.log(accessToken);
      if (totalWeightage <= categoryWeightage) {
        axios
          .put(
            `/updateQuestion?questionId=${editedQuestion.questionId}&questionContent=${editedQuestion.questionContent}&weightage=${updatedWeightage}`,
            null,{
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then(
            (response) => {
              // The question content and weightage have been successfully updated on the server.
              // You can perform any additional actions here if needed.
              // Exit edit mode
              setEditingRow(null);

              // Trigger a re-fetch of the data to reflect the changes
              setTriggerEffect((prevTrigger) => !prevTrigger);

              alert("Question content and weightage updated successfully.");
            },
            (error) => {
              console.log(error);
              alert("Failed to update question content and weightage.");
            }
          );
      } else {
        alert("Question weightage cannot exceed category weightage.");
      }
    }
  };

  const handleCancelEdit = () => {
    // Cancel editing by resetting editingRow
    setEditingRow(null);
  };

  return (
    <>
    {/* <Navbar /> */}
      {showPopup && (
        <DeleteCate
          message={popupMessage}
          onClose={closePopup}
          goToRecruiterDashboard={goToRecruiterDashboard}
        />
      )}

      {showPopup && (
        <AddCate
          message={popupMessage}
          onClose={closePopup}
          goToRecruiterDashboard={goToRecruiterDashboard}
        />
      )}
      <div className="container">
        <h1>Update Rating Form</h1>

        <form onSubmit={addCategory}>
          <input
            className="addCategory"
            type="text"
            name="category"
            placeholder="Add new category"
            value={cate}
            onChange={handleInputChange}
          />

          <button type="submit">
            <b>Add Category</b>
          </button>
        </form>

        {/* <div style={{ maxWidth: "3500px", margin: "0 auto" }}></div> */}
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h4 className="category-header">
              Category : {category.categoryName}
              &nbsp;
              {updatedCategoryWeightages[category.categoryId] !== undefined ? (
                <>
                  <input
                    type="number"
                    placeholder="Updated Weightage"
                    value={updatedCategoryWeightages[category.categoryId]}
                    onChange={(e) =>
                      handleCategoryWeightageChange(
                        category.categoryId,
                        e.target.value
                      )
                    }
                  />
                  &nbsp;&nbsp; &nbsp;&nbsp;
                </>
              ) : (
                <>({category.categoryWeightage}) &nbsp;&nbsp; &nbsp;&nbsp;</>
              )}
              {/* {<button  className="editCategorydel" onClick={() => handleDeleteCategory(category.categoryId)}>
        <FontAwesomeIcon icon={faTrash} /></button>} */}
              <button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "black",
                  // background: 'none',
                  backgroundColor: "white",
                  // border: '2px solid ',
                  border: "none",
                  borderRadius: "4px",
                  width: "35pxpx",
                  height: "35px",
                  float: "right",
                  margin: "-8px 2px 20px 1px",
                }}
                onClick={() => handleDeleteCategory(category.categoryId)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button
                className="editCategory"
                onClick={() => handleEditCategory(category.categoryId)}
              >
                <b>Edit</b>
              </button>
            </h4>

            <table>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Weightage</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cate1
                  .filter((c) => c.category.categoryId === category.categoryId)
                  .map((filteredQuestion, questionIndex) => (
                    <tr key={questionIndex}>
                      <td>
                        {editingRow === filteredQuestion.questionId ? (
                          <input
                            type="text"
                            value={filteredQuestion.questionContent}
                            onChange={(e) =>
                              handleEditInputChange(
                                filteredQuestion.questionId,
                                e,
                                "questionContent"
                              )
                            }
                          />
                        ) : (
                          filteredQuestion.questionContent
                        )}
                      </td>
                      <td>
                        {editingRow === filteredQuestion.questionId ? (
                          <input
                            type="number" // Assuming weightage is a number
                            value={filteredQuestion.weightage}
                            onChange={(e) =>
                              handleEditInputChange(
                                filteredQuestion.questionId,
                                e,
                                "weightage"
                              )
                            }
                          />
                        ) : (
                          filteredQuestion.weightage
                        )}
                      </td>
                      <td>
                        {editingRow === filteredQuestion.questionId ? (
                          <>
                            <button
                              style={{
                                color: "green",
                                background: "none",
                                border: "1px solid green",
                                borderRadius: "4px",
                              }}
                              onClick={() =>
                                handleSaveEdit(filteredQuestion.questionId)
                              }
                            >
                              <FontAwesomeIcon icon={faSave} />
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button
                              style={{
                                color: "blue",
                                background: "none",
                                border: "1px solid blue",
                                borderRadius: "4px",
                              }}
                              onClick={handleCancelEdit}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              style={{
                                color: "green",
                                background: "none",
                                border: "1px solid green",
                                borderRadius: "4px",
                              }}
                              onClick={() =>
                                handleEditQuestion(filteredQuestion.questionId)
                              }
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button
                              style={{
                                color: "red",
                                background: "none",
                                border: "1px solid red",
                                borderRadius: "4px",
                              }}
                              onClick={() =>
                                handleDeleteQuestion(
                                  filteredQuestion.questionId,
                                  category.categoryId
                                )
                              }
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <br />
            {category.categoryWeightage != 0 ? (
              <>
                <input
                  className="addQuestion"
                  type="text"
                  placeholder="Add new question"
                  value={categoryInputs[category.categoryId] || ""}
                  onChange={(e) =>
                    handleCategoryInputChange(category.categoryId, e)
                  }
                />

                <button
                  onClick={() =>
                    addQuestionToCategory(
                      category.categoryId,
                      category.categoryName
                    )
                  }
                >
                  Add Question
                </button>

                <br />
              </>
            ) : (
              <div></div>
            )}
          </div>
        ))}
        <br />

        <button
          style={{ textAlign: "center" }}
          onClick={handleSaveAllCategoryWeightages}
        >
          Save Category Weightages
        </button>
      </div>
      <></>
    </>
  );
};

export default Rating;
