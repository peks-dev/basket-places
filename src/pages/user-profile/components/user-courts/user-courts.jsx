import React, { useState } from "react";
import "./user-courts.css";

// components
import UserCourtsRegistered from "@/components/user-courts-registered/user-courts-registered";
import UserCourtsButtons from "./components/user-courts-btns";
import ComingSoon from "@/components/coming-soon/coming-soon";

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
          <ComingSoon />
        )}
      </ul>
    </div>
  );
};

export default UserCourts;
