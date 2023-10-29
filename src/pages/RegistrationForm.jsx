import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./style.css";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";
function RegistrationForm() {
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      const response = await registerUser(values);
      navigate("/");
      console.log("User registered:", response.data.message);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
      } else {
        console.error("An unexpected error occurred:", error.message);
      }
    }
  };

  function handleClick() {
    navigate("/");
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("*Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("*Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("*Password is required"),
  });

  return (
    <div className="register">
      <div className="registerform">
        <h1>Register</h1>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            userType: "user",
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            <div>
              <label htmlFor="name">Name:</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div>
              <label>User Type:</label>
              <div className="radio-container">
                <div className="radio-label">
                  <Field type="radio" name="userType" value="user" />
                  <label>User</label>
                </div>
                <div className="radio-label">
                  <Field type="radio" name="userType" value="vendor" />
                  <label>Vendor</label>
                </div>
              </div>
            </div>
            <button type="submit">Register</button>
            <button onClick={handleClick}>Login</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default RegistrationForm;
