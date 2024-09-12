import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify";
import { escapeHtml } from "../utils/securityUtils";
import "../styles/form.css";

const RegisterForm = () => {
  const { register } = useContext(AuthContext);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  // Sanitize input before sending to the backend
  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(escapeHtml(input));
  };

  const handleSubmit = async (
    values,
    { setSubmitting, setStatus, setErrors }
  ) => {
    setStatus(null); // Clear status message before submitting
    try {
      await register({
        name: sanitizeInput(values.name),
        email: sanitizeInput(values.email),
        password: sanitizeInput(values.password),
      });
      setStatus(
        "Registration successful. Please check your email to verify your account."
      );
    } catch (error) {
      console.error("Registration failed", error);

      // Handle specific error messages from the backend
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        if (errorMessage === "Email already in use") {
          setErrors({ email: "Email is already registered." });
        } else {
          setStatus(errorMessage || "Registration failed. Please try again.");
        }
      } else {
        setStatus("An unexpected error occurred. Please try again.");
      }
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <div>
            <Field type="text" name="name" placeholder="Name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button className="btn-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>
          {status && (
            <div
              className={status.includes("successful") ? "success" : "error"}
            >
              {status}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
