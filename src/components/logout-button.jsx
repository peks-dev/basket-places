import React from "react";
//context
import { useStepFormStore } from "@/context/stepFormStore";
import { useUserStore } from "@/context/userStore";
import { useUserCourtsRegisteredStore } from "@/context/userCourtsRegisteredStore";

//components
import Button from "@/components/button/button";

const LogoutButton = () => {
  const { logout } = useUserStore();
  const { resetStepForm } = useStepFormStore();
  const { resetUserCourtsList } = useUserCourtsRegisteredStore();

  function handleLogout() {
    logout();
    resetStepForm();
    resetUserCourtsList();
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
