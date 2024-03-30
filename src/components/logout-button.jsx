import React, { useContext } from "react";
//context
import UserContext from "@/context/user/userContext";
import { useStepFormStore } from "@/context/stepFormStore";

//components
import Button from "@/components/button/button";

const LogoutButton = () => {
  const { userLogout } = useContext(UserContext);
  const { resetStepForm } = useStepFormStore();

  function handleLogout() {
    userLogout();
    resetStepForm();
  }
  return (
    <>
      <Button type="button" onClick={handleLogout}>
        cerrar sesion
      </Button>
    </>
  );
};

export default LogoutButton;
