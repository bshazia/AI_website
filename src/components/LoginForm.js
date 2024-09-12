import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
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
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        await login({
          email: sanitizeInput(values.email),
          password: sanitizeInput(values.password),
        });
        setStatus(null); // Clear any previous status messages
      } catch (error) {
        console.error("Login failed", error);
        if (error.response && error.response.status === 401) {
          setStatus("Invalid credentials. Please try again.");
        } else {
          setStatus("An unexpected error occurred. Please try again.");
        }
      }
      setSubmitting(false);
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
        <button
          className="btn-submit"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>
        {formik.status && <div className="error">{formik.status}</div>}
      </form>
      <Link to="/forgot-password">Forgot your password?</Link>
    </div>
  );
};

export default LoginForm;
