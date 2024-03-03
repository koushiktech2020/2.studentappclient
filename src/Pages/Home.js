/* eslint-disable */
import { useState, useEffect } from "react"; // Importing React hooks
import { getData, deleteData } from "Utils/HttpClient"; // Importing HTTP client utility functions

import { base_url } from "Helper/UrlHelper/UrlHelper"; // Importing base URL for API requests
import {
  get_all_student,
  delete_student,
} from "Helper/UrlHelper/StudentUrlHelper"; // Importing user-related API endpoint URLs

import SaveStudentModal from "../Components/SaveStudentModal";

const Home = () => {
  // State variables
  const [isLoading, setIsLoading] = useState(false);
  const [studentList, setStudentList] = useState([]); // State variable for user list
  const [selectedStudentId, setSelectedStudentId] = useState(null); // State variable for selected user ID

  // Function to fetch user list from server
  const getStudentList = async () => {
    try {
      setIsLoading(true);
      const endPoint = base_url + get_all_student; // API endpoint for getting all users
      const response = await getData(endPoint); // Making HTTP GET request
      setIsLoading(false);
      if (response.status) {
        setStudentList(response.data); // Setting user list state variable with response data
      }
    } catch (error) {
      console.log(error.message); // Logging error message
    }
  };

  // Function to delete a user
  const deleteStudentHandler = async (studentId) => {
    try {
      const endPoint = `${base_url}${delete_student}/${studentId}`; // API endpoint for deleting a user
      const response = await deleteData(endPoint); // Making HTTP DELETE request

      if (response.status) {
        getStudentList(); // Refreshing user list after deletion
      }
    } catch (error) {
      console.log(error); // Logging error message
    }
  };

  // Fetch user list on component mount
  useEffect(() => {
    getStudentList();
  }, []);

  if (isLoading) {
    return (
      <div className="container">
        <div className="container text-center mt-3">
          <h1>Student Management System</h1>
        </div>

        <div className="mb-2 gap-2 d-flex justify-content-center align-items-center mt-5">
          <h1 className="text-primary">Please wait while fetching data</h1>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
            return (
              <div
                key={index}
                className="text-primary spinner-grow spinner-grow-sm"
                role="status"
                style={{ width: "0.7rem", height: "0.7rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="container text-center mt-3">
          <h1>Student Management System</h1>
        </div>

        <div className="mb-2 d-flex justify-content-end mt-5">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#saveStudentModal"
          >
            Add New
          </button>
        </div>

        <div className="mt-5">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>

            <tbody>
              {/* Iterate over user list */}
              {studentList.map((student, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">{student.name}</td>
                    <td className="text-center">{student.email}</td>
                    <td className="text-center">{student.phone}</td>
                    <td className="text-center">{student.address}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-primary w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#saveStudentModal"
                        onClick={() => {
                          setSelectedStudentId(student._id);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-danger w-75"
                        onClick={() => {
                          deleteStudentHandler(student._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal for adding/updating users */}
        <SaveStudentModal
          selectedStudentId={selectedStudentId}
          setSelectedStudentId={setSelectedStudentId}
          afterModalClose={getStudentList}
        />
      </div>
    );
  }
};

export default Home;
