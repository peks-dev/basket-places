import React, { useEffect } from "react";
import "./edit-court.css";

// router
import { useParams, useLocation } from "react-router-dom";

// hooks
import { useFormFiller } from "./hooks/use-form-filler";
import { useStepFormStore } from "@/context/stepFormStore";
import { useMapStore } from "@/context/mapStore";

// components
import FormStep from "../../components/form-step/form-step";
import Loader from "@/components/loader/loader";

const EditCourt = () => {
  const courtData = useLocation().state;
  const { resetStepForm } = useStepFormStore();
  const { loading } = useFormFiller(courtData);
  const { resetMapStepForm } = useMapStore();

  useEffect(() => {
    return () => {
      resetStepForm();
      resetMapStepForm();
    };
  }, [courtData]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="edit-court">
      <FormStep />
    </div>
  );
};

export default EditCourt;
