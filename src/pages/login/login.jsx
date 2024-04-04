import React from "react";
import { Navigate } from "react-router-dom";
// Components
import AuthForm from "@/components/auth-form/auth-form";
// context
import { useUserStore } from "@/context/userStore";

const LoginPage = () => {
  const { session } = useUserStore();

  if (session) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <AuthForm />
    </>
  );
};

export default LoginPage;
