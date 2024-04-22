import React, { useEffect } from "react";
import "./edit-court.css";
// router
import { useLocation } from "react-router-dom";
// hooks
import { useFormFiller } from "./hooks/use-form-filler";
import { useEditCourt } from "@/hooks/use-edit.court";
// context
import { useStepFormStore } from "@/context/stepFormStore";
import { useMapStore } from "@/context/mapStore";
// components
import FormStep from "@/components/form-step/form-step";
import Loader from "@/components/loader/loader";

const EditCourt = () => {
  const location = useLocation();
  const courtData = useLocation().state;
  const { formData, resetStepForm, resetSteps } = useStepFormStore();
  const { loading } = useFormFiller(courtData);
  const { resetMapStepForm } = useMapStore();
  const {
    error,
    loading: loadingSendForm,
    success,
    resetError,
    sendCourtUpdates,
  } = useEditCourt();

  useEffect(() => {
    // start in first step
    console.log(location);
    resetSteps();
    return () => {
      resetStepForm();
      resetMapStepForm();
    };
  }, [courtData]);

  if (loading) {
    return <Loader />;
  }

  if (!formData.id) {
    return <div>no hay datos</div>;
  }

  return (
    <div className="edit-court">
      <FormStep
        successState={success}
        errorState={error}
        loadingState={loadingSendForm}
        sendFormFn={sendCourtUpdates}
        resetErrorFn={resetError}
      />
    </div>
  );
};

export default EditCourt;
