import React from "react";
import "./user-info.css";
// context
import { useUserStore } from "@/context/userStore";
// components
import UserOptions from "../user-options/user-options";
import UserAvatar from "@/components/user-avatar/user-avatar";

const UserInfo = () => {
  const { profile } = useUserStore();

  return (
    <header className="user-info">
      <UserAvatar imgUrl={profile.avatar_url} />
      <div className="user-info__text-wrap">
        <p className="user-info__name">{profile.apodo}</p>
      </div>
      <UserOptions />
    </header>
  );
};

export default UserInfo;
