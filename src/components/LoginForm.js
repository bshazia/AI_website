// src/components/LoginForm.js

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import DOMPurify from "dompurify";
import { escapeHtml } from "../utils/securityUtils";
import "../styles/form.css";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(""); // State for displaying error messages

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await login({
          email: sanitizeInput(values.email),
          password: sanitizeInput(values.password),
        });
        // Redirect or handle successful login
      } catch (error) {
        console.error("Login failed", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          // Display backend error message
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      }
    },
  });

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(escapeHtml(input));
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <button className="btn-submit" type="submit">
          Login
        </button>
      </form>
      <Link to="/forgot-password">Forgot your password?</Link>
    </div>
  );
};

export default LoginForm;
