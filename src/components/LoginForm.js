import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import DOMPurify from "dompurify";
import { escapeHtml } from "../utils/securityUtils";
import styled from "styled-components";



const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #1b9cfc;
  border-radius: 5px;
  color: #c1c2c3;
  background: none;
  font-size: large;
  font-weight: bold;
`;

const Button = styled.button`
  width: 50%;
  padding: 10px;
  border: 2px solid #55e6c1;
  border-radius: 40px;
  background: transparent;
  color: #c1c2c3;
  font-weight: bolder;
  cursor: pointer;
  margin: 20px 0;

  &:hover {
    background: #55e6c1;
    color: #182c61;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: { email: "", password: "" },
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
        setErrorMessage(
          error.response?.data?.error || "An unexpected error occurred."
        );
      }
    },
  });

  const sanitizeInput = (input) => DOMPurify.sanitize(escapeHtml(input));

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
        />
        {formik.touched.email && formik.errors.email && (
          <ErrorMessage>{formik.errors.email}</ErrorMessage>
        )}
        <Input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
        />
        {formik.touched.password && formik.errors.password && (
          <ErrorMessage>{formik.errors.password}</ErrorMessage>
        )}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button type="submit">Login</Button>
      </form>
      <Link to="/forgot-password">Forgot your password?</Link>
    </div>
  );
};

export default LoginForm;
