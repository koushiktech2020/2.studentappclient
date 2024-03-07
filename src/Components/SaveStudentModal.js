/* eslint-disable */
import React, { useState, useEffect } from "react"; // Importing React hooks

import { getData, postData, putData, uploadSingleFile } from "Utils/HttpClient"; // Importing HTTP client utility gatweway functions
import { base_url } from "Helper/UrlHelper/UrlHelper"; // Importing base URL for API requests
import {
  add_new_student,
  get_student_details,
  update_student,
} from "Helper/UrlHelper/StudentUrlHelper.js"; // Importing user-related API endpoint URLs

const SaveStudentModal = ({
  selectedStudentId,
  setSelectedStudentId,
  afterModalClose,
}) => {
  // State variables
  const [name, setName] = useState(""); // State variable for user name
  const [email, setEmail] = useState(""); // State variable for user email
  const [address, setAddress] = useState(""); // State variable for user address
  const [phone, setPhone] = useState(""); // State variable for user phone

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  // Function to handle input field changes
  const onInputChangeHandler = (e) => {
    const { name, value } = e.target;

    // Switch case to determine which input field triggered the change
    switch (name) {
      case "name":
        setName(value); // Update name state
        setNameError(""); // Clear name error
        break;
      case "email":
        setEmail(value); // Update email state
        setEmailError(""); // Clear email error
        break;
      case "address":
        setAddress(value); // Update address state
        setAddressError(""); // Clear address error
        break;
      case "phone":
        setPhone(value); // Update phone state
        setPhoneError(""); // Clear phone error
        break;
      default:
        break;
    }
  };

  // Function to validate input fields
  const validateInputs = () => {
    let isValid = true;

    // Validate name
    if (!name.trim()) {
      setNameError("* Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    // Validate email
    if (!email.trim()) {
      setEmailError("* Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate address
    if (!address.trim()) {
      setAddressError("* Address is required");
      isValid = false;
    } else {
      setAddressError("");
    }

    // Validate phone
    if (!phone.trim()) {
      setPhoneError("* Phone is required");
      isValid = false;
    } else {
      setPhoneError("");
    }

    return isValid;
  };

  // Function to fetch user details
  const getStudentDetails = async () => {
    try {
      let endPoint = base_url + get_student_details + `/${selectedStudentId}`; // API endpoint for getting user details

      const response = await getData(endPoint); // Fetch user details

      if (response.status) {
        // Set state variables with user details
        setName(response.data.name);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setPhone(response.data.phone);
      }
    } catch (error) {
      console.log(error.message); // Log error message
    }
  };

  // Function to save user data
  const saveStudentHandler = async (e) => {
    if (validateInputs()) {
      setIsSaving(true);
      try {
        const studentData = {
          name,
          email,
          address,
          phone,
        };

        let endPoint = `${base_url}`; // Base API endpoint

        let response = {}; // Response object

        if (selectedStudentId) {
          // If selected user ID exists, update user data
          endPoint += `${update_student}/${selectedStudentId}`; // API endpoint for updating user
          response = await putData(endPoint, studentData); // PUT request to update user data
        } else {
          // If selected user ID doesn't exist, add new user
          endPoint += `${add_new_student}`; // API endpoint for adding new user
          response = await postData(endPoint, studentData); // POST request to add new user
        }

        setIsSaving(false);

        resetAll(); // Reset all state variables

        if (response.status) {
          // If request is successful, close modal and refresh user list
          let modal = bootstrap.Modal.getInstance(
            document.querySelector("#saveStudentModal")
          );
          modal.hide(); // Hide modal
          afterModalClose(); // Call function to handle modal close
        }
      } catch (error) {
        console.log(error); // Log error message
      }
    }
  };

  // Function to reset all state variables
  const resetAll = () => {
    setName(""); // Reset user name
    setEmail(""); // Reset user email
    setAddress(""); // Reset user address
    setPhone(""); // Reset user phone
    setSelectedStudentId(null); // Reset selected user ID
    setNameError("");
    setEmailError("");
    setAddressError("");
    setPhoneError("");
  };

  // Fetch user details on component mount if selected user ID exists
  useEffect(() => {
    if (selectedStudentId) {
      getStudentDetails();
    }
  }, [selectedStudentId]);

  return (
    <div
      className="modal fade "
      id="saveStudentModal"
      tabIndex="-1"
      aria-labelledby="saveStudentModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="saveStudentModalLabel">
              Save Student
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={resetAll}
            ></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={onInputChangeHandler}
                />
                <div className="text-danger">{nameError}</div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="user@email.com (Enter different email)"
                  name="email"
                  value={email}
                  onChange={onInputChangeHandler}
                />
                <div className="text-danger">{emailError}</div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  name="address"
                  value={address}
                  onChange={onInputChangeHandler}
                />
                <div className="text-danger">{addressError}</div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Phone
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Phone (Enter different phone number)"
                  name="phone"
                  value={phone}
                  onChange={onInputChangeHandler}
                />
                <div className="text-danger">{phoneError}</div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={resetAll}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={saveStudentHandler}
            >
              Save changes
              {isSaving && (
                <div
                  className="ms-2 spinner-border spinner-border-sm text-light"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveStudentModal;
