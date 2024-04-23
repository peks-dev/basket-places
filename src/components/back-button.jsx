import React from "react";
import { useNavigate } from "react-router-dom";
// components
import Button from "@/components/button/button";
import ArrowIcon from "@/components/icons/arrow-icon";

const BackButton = () => {
  const navigate = useNavigate();
  function handleBack() {
    navigate(-1);
  }

  return (
    <Button variant={"back"} onClick={handleBack}>
      <ArrowIcon />
    </Button>
  );
};

export default BackButton;
