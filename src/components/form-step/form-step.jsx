import React from "react";
import "./form-step.css";
// Components
import FormStepHeader from "./components/form-step-header/form-step-header";
import FormStepBtns from "./components/form-step-btns/form-step-btns";
import RenderStep from "./components/step-to-render";
import Loader from "@/components/loader/loader";
import ErrorDisplay from "@/components/errors/error-display/error-display";
import { ErrorBoundary } from "../../utilities/error-boundaries";

// hooks
import { useSendFormData } from "@/components/form-step/hooks/use-send-form-data.hook";

const FormStep = () => {
  const { loading, error, success, registerCourt, resetError } =
    useSendFormData();

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    } else if (error) {
      return <ErrorDisplay error={error} resetError={resetError} />;
    } else if (success) {
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
        {!loading && !success && !error && (
          <FormStepBtns onSend={registerCourt} />
        )}
      </form>
    </div>
  );
};

export default FormStep;
