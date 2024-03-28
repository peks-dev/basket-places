import React from "react";
import "./form-step.css";

// Components
import FormStepHeader from "./components/form-step-header/form-step-header";
import FormStepBtns from "./components/form-step-btns/form-step-btns";
import RenderStepContent from "./components/step-to-render";
import Loader from "@/components/loader/loader";
import Error from "@/components/error/error";
import { useStepFormStore } from "@/context/stepFormStore";

const FormStep = ({ loadingState, errorState, successState, sendFunction }) => {
  return (
    <div className="form-step">
      <FormStepHeader />
      <form className="form-step__body">
        <div className="form-step__active">
          {loadingState && <Loader />}
          {errorState && <Error error={errorState} />}
          {successState && <div> Datos enviados correctamente</div>}
          {!loadingState && !successState && !errorState && (
            <RenderStepContent />
          )}
        </div>
        {!loadingState && !successState && !errorState && (
          <FormStepBtns onSend={sendFunction} />
        )}
      </form>
    </div>
  );
};

export default FormStep;
