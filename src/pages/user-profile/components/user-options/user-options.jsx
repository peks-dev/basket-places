import React, { useState } from "react";
import "./user-options.css";

// components
import Button from "@/components/button/button";
import LogoutButton from "@/components/logout-button";
import OptionsIcon from "@/components/icons/options-icon";
// context

import { useCourtDetailsStore } from "@/context/courtDetailsStore";
import { useToastStore } from "@/context/toastStore";

const UserOptions = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { emptyGlobalCourtData } = useCourtDetailsStore();
  const { resetToast } = useToastStore();

  function handleDeleteAcc() {
    emptyGlobalCourtData();
    resetToast();
  }

  function handleShowOptions() {
    setShowOptions((state) => !state);
  }
  return (
    <div className="user-options">
      <Button
        variant={"options"}
        onClick={handleShowOptions}
        customStyle={showOptions ? "active" : ""}
      >
        <OptionsIcon />
      </Button>
      {showOptions && (
        <div className={`user-options__wrapper ${showOptions ? "active" : ""}`}>
          <LogoutButton />
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
