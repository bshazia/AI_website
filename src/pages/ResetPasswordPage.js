import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  styled,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import authService from "../services/authService";
import axios from "axios";

const { resetPassword } = authService;

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#1c1c1c",
  color: "#fff",
  textAlign: "center",
});

const StyledTextField = styled(TextField)({
  marginBottom: "16px",
  "& .MuiInputLabel-root": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
});

const validationSchema = yup.object({
  newPassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain both letters and numbers")
    .matches(/\d/, "Password must contain both letters and numbers"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = React.useState(false);
  const [csrfToken, setCsrfToken] = useState(null);
  const navigate = useNavigate();

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/csrf-token`,
          {
            withCredentials: true,
          }
        );
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handlePasswordReset = async (values) => {
    setLoading(true);
    try {
      const response = await resetPassword(
        token,
        values.newPassword,
        csrfToken
      );
      if (response.message === "Password updated successfully") {
        navigate("/dashboard");
      } else {
        alert("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Container>
        <Typography variant="h6">Invalid or expired token.</Typography>
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          style={{ marginTop: "20px", color: "#fff", borderColor: "#fff" }}
        >
          Back to Landing Page
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4">Reset Your Password</Typography>
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handlePasswordReset}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb={2}>
              <Field
                as={StyledTextField}
                name="newPassword"
                type="password"
                label="New Password"
                fullWidth
                variant="outlined"
                helperText={<ErrorMessage name="newPassword" />}
                error={Boolean(<ErrorMessage name="newPassword" />)}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={StyledTextField}
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                fullWidth
                variant="outlined"
                helperText={<ErrorMessage name="confirmPassword" />}
                error={Boolean(<ErrorMessage name="confirmPassword" />)}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || loading}
            >
              {loading ? <CircularProgress size={24} /> : "Reset Password"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              style={{ marginTop: "20px", color: "#fff", borderColor: "#fff" }}
            >
              Back to Main Page
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ResetPasswordPage;
