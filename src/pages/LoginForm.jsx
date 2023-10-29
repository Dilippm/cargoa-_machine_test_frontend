import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from '../api/api';
function LoginForm() {
 
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await loginUser(values);
      const { token, type } = response;

      localStorage.setItem('token', token);
      localStorage.setItem('type', type);

      navigate('/home');
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }
 
  function handleClick() {
    navigate("/register");
  }
  const validationSchema = Yup.object().shape({
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
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
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

            <button type="submit">Login</button>
            <button onClick={handleClick}>Register</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;
