import React, { useState, useContext } from "react";
import "./user-options.css";

// components
import Button from "@/components/button/button";
import OptionsIcon from "@/components/icons/options-icon";
// context
import UserContext from "@/context/user/userContext";
import { useCourtDetailsStore } from "@/context/courtDetailsStore";
import { useStepFormStore } from "@/context/stepFormStore";

const UserOptions = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { user, userLogout } = useContext(UserContext);
  const { resetStepForm } = useStepFormStore();
  const { emptyGlobalCourtData } = useCourtDetailsStore();

  function handleLogout() {
    userLogout();
    resetStepForm();
  }

  function handleDeleteAcc() {
    emptyGlobalCourtData();
  }

  function handleShowOptions() {
    setShowOptions((state) => !state);
  }
  return (
    <div className="user-options">
      <Button
        variant={"icon"}
        onClick={handleShowOptions}
        customStyle={showOptions ? "active" : ""}
      >
        <OptionsIcon />
      </Button>
      {showOptions && (
        <div className={`user-options__wrapper ${showOptions ? "active" : ""}`}>
          <Button onClick={handleLogout}> cerrar sesion</Button>
          <Button>editar perfil</Button>
          <Button variant={"secundary"} onClick={handleDeleteAcc}>
            eliminar cuenta
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserOptions;
