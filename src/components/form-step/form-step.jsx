import React from "react";
import { useNavigate } from "react-router-dom";
import "./form-step.css";
// context
import { useStepFormStore } from "@/context/stepFormStore";
// Components
import FormStepHeader from "./components/form-step-header/form-step-header";
import FormStepBtns from "./components/form-step-btns/form-step-btns";
import RenderStep from "./components/step-to-render";
import Loader from "@/components/loader/loader";
import ErrorDisplay from "@/components/errors/error-display/error-display";

import Button from "@/components/button/button";

const FormStep = ({
  loadingState,
  errorState,
  successState,
  resetErrorFn,
  sendFormFn,
}) => {
  const navigate = useNavigate();
  const { resetStepForm } = useStepFormStore();

  function handleNavite() {
    resetStepForm();
    navigate(`/courts/${successState}`, { replace: true });
  }

  const renderContent = () => {
    if (loadingState) {
      return <Loader />;
    } else if (errorState) {
      return <ErrorDisplay error={errorState} resetError={resetErrorFn} />;
    } else if (successState) {
      // succesState === court id
      return (
        <div>
          <h3>Datos enviados correctamente</h3>
          <Button type={"button"} onClick={handleNavite}>
            ver detalles
          </Button>
        </div>
      );
    } else {
      return <RenderStep />;
    }
  };

  return (
    <div className="form-step">
      <FormStepHeader />
      <form className="form-step__body">
        <div className="form-step__active">{renderContent()}</div>
        {!loadingState && !successState && !errorState && (
          <FormStepBtns onSend={sendFormFn} />
        )}
      </form>
    </div>
  );
};

export default FormStep;
