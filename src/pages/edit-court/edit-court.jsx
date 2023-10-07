import React from "react";
import "./edit-court.css";

// router
import { useParams } from "react-router-dom";

// hooks
import { useFormFiller } from "./hooks/use-form-filler";
import { useUpdateCourt } from "./hooks/use-update-court.hook";

// components
import FormStep from "../../components/form-step/form-step";
import Loader from "../../components/loader/loader";
import Error from "../../components/error/error";

const EditCourt = () => {
  const courtPath = useParams();
  const courtId = courtPath.courtId;
  const { loading: loadingFiller, error: errorFiller } = useFormFiller(courtId);
  const {
    loading: loadingUpdater,
    error: errorUpdater,
    success: successUpdater,
    updateCourt,
  } = useUpdateCourt(courtId);

  if (loadingFiller) {
    return <Loader />; // Muestra un loader mientras se cargan los datos
  }

  if (errorFiller || errorUpdater) {
    console.log(errorUpdater);
    return <Error />; // Muestra un mensaje de error si ocurre un error
  }

  return (
    <div className="edit-court">
      <FormStep
        loadingState={loadingUpdater}
        errorState={errorUpdater}
        successState={successUpdater}
        sendFunction={updateCourt}
      />
    </div>
  );
};

export default EditCourt;
