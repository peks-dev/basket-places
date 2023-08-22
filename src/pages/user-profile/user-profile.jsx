import React from "react";
import "./user-profile.css";

// components
import UserInfo from "./components/user-info/user-info";
import UserCourts from "./components/user-courts/user-courts";

const UserProfilePage = () => {
  return (
    <section className="user-profile-page">
      <UserInfo />
      <UserCourts />
    </section>
  );
};

export default UserProfilePage;
