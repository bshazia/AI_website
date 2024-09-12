import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, styled } from "@mui/material";
import authService from "../services/authService";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#1c1c1c",
  color: "#fff",
  padding: "20px",
});

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        setProfile(data);
      } catch (error) {
        alert("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const formik = useFormik({
    initialValues: profile,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await authService.updateProfile(values);
        alert("Profile updated successfully");
      } catch (error) {
        alert("Failed to update profile");
      }
    },
  });

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4">Edit Profile</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
          fullWidth
          margin="normal"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
          fullWidth
          margin="normal"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
        <Button
          onClick={() => navigate("/")}
          variant="outlined"
          color="secondary"
          style={{ marginTop: "10px" }}
        >
          Back to Home
        </Button>
      </form>
    </Container>
  );
};

export default ProfilePage;
