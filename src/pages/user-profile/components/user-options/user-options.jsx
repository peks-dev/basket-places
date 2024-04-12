import React, { useState } from "react";
import "./user-options.css";

// components
import Button from "@/components/button/button";
import LogoutButton from "@/components/logout-button";
import OptionsIcon from "@/components/icons/options-icon";
import EditProfile from "@/components/edit-profile/edit-profile";
import DeleteAccountButton from "@/components/delete-account-button";

const UserOptions = () => {
  const [showOptions, setShowOptions] = useState(false);

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
          <EditProfile />
          <DeleteAccountButton />
        </div>
      )}
    </div>
  );
};

export default UserOptions;
