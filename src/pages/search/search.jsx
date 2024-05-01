import React from "react";
import "./search.css";
// context
import { useToastStore } from "@/context/toastStore";
// components
import Button from "@/components/button/button";
import AvatarSkeleton from "@/components/skeletons/avatar-skeleton/avatar-skeleton";
import ComingSoon from "@/components/coming-soon/coming-soon";

const SearchPage = () => {
  const { resetToast } = useToastStore();

  return <ComingSoon />;
};

export default SearchPage;
