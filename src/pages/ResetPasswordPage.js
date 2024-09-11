import React from "react";
import { useSearchParams } from "react-router-dom";
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
import authService from "../services/authService"; // Import the default export

const { resetPassword } = authService; // Destructure the resetPassword function

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

  const handlePasswordReset = async (values) => {
    setLoading(true);
    try {
      const response = await resetPassword(token, values.newPassword);
      if (response.message === "Password reset successfully") {
        alert("Password reset successfully");
        // Redirect to login or another page if needed
      } else {
        alert("Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An error occurred while resetting your password");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Container>
        <Typography variant="h6">Invalid or expired token.</Typography>
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
                as={TextField}
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
                as={TextField}
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
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ResetPasswordPage;
