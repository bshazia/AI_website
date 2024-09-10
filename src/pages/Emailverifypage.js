// src/pages/VerifyEmailPage.js
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import  useAuth  from "../hooks/useAuth";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { verifyEmail } = useAuth();

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token, verifyEmail]);

  return <div>Verifying your email...</div>;
};

export default VerifyEmailPage;
