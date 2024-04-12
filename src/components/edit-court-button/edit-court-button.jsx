import React from "react";
import { useNavigate } from "react-router-dom";
// components
import Button from "@/components/button/button";

const EditCourtButton = ({ courtData }) => {
  const navigate = useNavigate();

  function handleEditCourt() {
    navigate("/edit-court", { state: courtData });
  }
  return (
    <Button type={"button"} onClick={handleEditCourt} variant={"court-card"}>
      editar
    </Button>
  );
};

export default EditCourtButton;
