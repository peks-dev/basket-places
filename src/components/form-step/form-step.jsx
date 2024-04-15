import React from "react";
import "./form-step.css";
// Components
import FormStepHeader from "./components/form-step-header/form-step-header";
import FormStepBtns from "./components/form-step-btns/form-step-btns";
import RenderStep from "./components/step-to-render";
import Loader from "@/components/loader/loader";
import ErrorDisplay from "@/components/errors/error-display/error-display";
import { ErrorBoundary } from "../../utilities/error-boundaries";

const FormStep = ({
  loadingState,
  errorState,
  successState,
  resetErrorFn,
  sendFormFn,
}) => {
  const renderContent = () => {
    if (loadingState) {
      return <Loader />;
    } else if (errorState) {
      return <ErrorDisplay error={errorState} resetError={resetErrorFn} />;
    } else if (successState) {
      return <div>Datos enviados correctamente</div>;
    } else {
      return (
        <ErrorBoundary>
          <RenderStep />
        </ErrorBoundary>
      );
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
