import React from "react";
//context
import { useStepFormStore } from "@/context/stepFormStore";
import { useUserStore } from "@/context/userStore";

//components
import Button from "@/components/button/button";

const LogoutButton = () => {
  const { logout } = useUserStore();
  const { resetStepForm } = useStepFormStore();

  function handleLogout() {
    logout();
    resetStepForm();
    if (localStorage.getItem("registered-user-courts")) {
      localStorage.removeItem("registered-user-courts");
    }
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
