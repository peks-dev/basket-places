import React, { useState } from "react";
import "./user-options.css";

// components
import Button from "@/components/button/button";
import OptionsIcon from "@/components/icons/options-icon";

const UserOptions = () => {
  const [showOptions, setShowOptions] = useState(false);
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
          <Button> cerrar sesion</Button>
          <Button>editar perfil</Button>
          <Button variant={"secundary"}>eliminar cuenta</Button>
        </div>
      )}
    </div>
  );
};

export default UserOptions;
