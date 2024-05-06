import React from "react";
import "./confirm-account.css";
// hooks
import { useNavigate } from "react-router-dom";

//components
import PageWrapper from "@/components/layout/page-wrapper/page-wrapper";
import Button from "@/components/button/button";

const ConfirmAccountPage = () => {
  const navigate = useNavigate();

  function handleNavigateAuthForm() {
    navigate("/login");
  }

  return (
    <PageWrapper page={"confirm-account"} variant={"column"}>
      <div className="confirm-account">
        <h1>correo confirmado!</h1>
        <p>gracias por confirmar tu cuenta, ahora puedes iniciar sesion</p>
        <Button type="button" onClick={handleNavigateAuthForm}>
          ingresar a mi cuenta
        </Button>
      </div>
    </PageWrapper>
  );
};

export default ConfirmAccountPage;
