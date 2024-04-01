import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import "./user-profile.css";

// context
import { useUserStore } from "@/context/userStore";

// components
import UserInfo from "./components/user-info/user-info";
import UserCourts from "./components/user-courts/user-courts";

const UserProfilePage = () => {
  const { session } = useUserStore();
  const location = useLocation();

  if (!session) {
    return <Navigate to={"/login"} state={{ path: location.pathname }} />;
  }

  return (
    <section className="user-profile-page">
      <UserInfo />
      <UserCourts />
    </section>
  );
};

export default UserProfilePage;
