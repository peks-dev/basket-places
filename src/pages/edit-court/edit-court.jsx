import React, { useEffect } from "react";
import "./edit-court.css";

// router
import { useParams } from "react-router-dom";

// hooks
import { useFormFiller } from "./hooks/use-form-filler";

// components
import FormStep from "../../components/form-step/form-step";
import Loader from "../../components/loader/loader";

const EditCourt = () => {
  const courtPath = useParams();
  const courtId = courtPath.courtId;

  useEffect(() => {
    // verificar si esta la cancha en localStorage
    // si no, hacer llamado back-end
    // cargar data en el step form
  }, []);

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
