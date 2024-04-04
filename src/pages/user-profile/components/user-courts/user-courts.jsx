import React, { useState } from "react";
import "./user-courts.css";

// components
import UserCourtsRegistered from "./components/user-courts-registered";
import UserCourtsButtons from "./components/user-courts-btns";

const UserCourts = () => {
  const [activeButton, setActiveButton] = useState("register");

  return (
    <div className="user-courts">
      <UserCourtsButtons
        setStateBtn={setActiveButton}
        stateBtn={activeButton}
      />
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
