import React from "react";
import "./search.css";
// context
import { useToastStore } from "@/context/toastStore";
// services
import { fetchUser } from "@/services/supabase/table-operations.service";
// components
import ComingSoon from "@/components/coming-soon/coming-soon";
import Button from "@/components/button/button";

const SearchPage = () => {
  const { resetToast } = useToastStore();
  return <ComingSoon />;
};

export default SearchPage;
