import React from "react";
// components
import Button from "@/components/button/button";

const UserCourtsButtons = ({ setStateBtn, stateBtn }) => {
  function handleShowRegisterCourts() {
    setStateBtn("register");
  }
  function handleShowFavoritesCourts() {
    setStateBtn("favorites");
  }
  return (
    <div className="user-courts__btns-wrap">
      <Button
        variant={"secundary"}
        onClick={handleShowRegisterCourts}
        customStyle={stateBtn === "register" ? "active" : ""}
      >
        registrados
      </Button>
      <Button
        variant={"secundary"}
        onClick={handleShowFavoritesCourts}
        customStyle={stateBtn === "favorites" ? "active" : ""}
      >
        favoritos
      </Button>
    </div>
  );
};

export default UserCourtsButtons;
