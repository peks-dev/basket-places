import React, { useState } from "react";
import "./user-courts.css";

import UserCourtsRegistered from "./components/user-courts-registered";
import Button from "@/components/button/button";

const UserCourts = () => {
  const [activeButton, setActiveButton] = useState("register");

  function handleShowRegisterCourts() {
    setActiveButton("register");
  }
  function handleShowFavoritesCourts() {
    setActiveButton("favorites");
  }
  return (
    <div className="user-courts">
      <div className="user-courts__btns-wrap">
        <Button
          variant={activeButton !== "register" && "secundary"}
          onClick={handleShowRegisterCourts}
          customStyle={activeButton === "register" ? "active" : ""}
        >
          registrados
        </Button>
        <Button
          variant={activeButton !== "favorites" && "secundary"}
          onClick={handleShowFavoritesCourts}
          customStyle={activeButton === "favorites" ? "active" : ""}
        >
          favoritos
        </Button>
      </div>
      <ul className="user-courts__wrap">
        {activeButton === "register" ? (
          <UserCourtsRegistered />
        ) : (
          <div>canchas favoritas</div>
        )}
      </ul>
    </div>
  );
};

export default UserCourts;
