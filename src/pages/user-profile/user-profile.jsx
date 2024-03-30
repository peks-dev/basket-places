import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import "./user-profile.css";

// context
import UserContext from "@/context/user/userContext";

// components
import UserInfo from "./components/user-info/user-info";
import UserCourts from "./components/user-courts/user-courts";

const UserProfilePage = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (!user.id) {
    return (
      <Navigate to={"/login"} replace state={{ path: location.pathname }} />
    );
  }
  return (
    <section className="user-profile-page">
      <UserInfo />
      <UserCourts />
    </section>
  );
};

export default UserProfilePage;
