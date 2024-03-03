/* eslint-disable */
import axios from "axios";

//get method
const getData = (url = "") => {
  return request("get", url);
};

//post method
const postData = (url = "", inputData = {}) => {
  return request("post", url, inputData);
};

//put/update method
const putData = (url = "", inputData = {}) => {
  return request("put", url, inputData);
};

//delete method
const deleteData = (url = "") => {
  return request("delete", url);
};

//common method
const request = async (method, url = "", params = {}) => {
  try {
    const { data } = await axios[method](url, params);
    return data;
  } catch (error) {
    return error.message;
  }
};

//upload form data
const uploadFormData = async (url = "", formValues = {}, method) => {
  const formData = new FormData();

  Object.keys(formValues).forEach((key) => {
    formData.append(key, formValues[key]);
  });

  try {
    const response = await axios[method](url, formData);

    return response.data;
  } catch (error) {
    return error.message;
  }
};

//upload single file method
const uploadSingleFile = async (url, formValues = {}) => {
  try {
    const formData = new FormData();

    formData.append("upload", formValues);

    const { data } = await axios.post(url, formData);

    return data;
  } catch (error) {
    return error.message;
  }
};

//upload multiple files method
const uploadMultipleFile = async (url, formValues = []) => {
  try {
    const formData = new FormData();

    let objArray = Object.keys(formValues);

    objArray.forEach((element) => {
      formData.append("uploads", formValues[element]);
    });

    const { data } = await axios.post(url, formData);

    return data;
  } catch (error) {
    return error.message;
  }
};

export {
  getData,
  postData,
  putData,
  deleteData,
  uploadFormData,
  uploadSingleFile,
  uploadMultipleFile,
};
