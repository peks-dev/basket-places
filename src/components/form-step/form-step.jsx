import React, { useState, useEffect } from "react";
import "./form-step.css";

// Components
import FormStepHeader from "./components/form-step-header/form-step-header";
import FormStepBtns from "./components/form-step-btns/form-step-btns";
import RenderStepContent from "./components/step-to-render";
import Loader from "../loader/loader";
import Error from "../error/error";

const FormStep = ({ loadingState, errorState, successState, sendFunction }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Limpiar los datos del stepLocation al desmontar componente
    return () => {
      if (localStorage.getItem("authToken")) {
        localStorage.removeItem("authToken");
      }
      if (localStorage.getItem("countries")) {
        localStorage.removeItem("countries");
      }
    };
  }, []);

  return (
    <div className="form-step">
      <FormStepHeader step={step} />
      <form className="form-step__body">
        <div className="form-step__active">
          {loadingState && <Loader />}
          {errorState && <Error />}
          {successState && <div> Datos enviados correctamente</div>}
          {!loadingState && !successState && !errorState && (
            <RenderStepContent stepToRender={step} />
          )}
        </div>
        {!loadingState && !successState && !errorState && (
          <FormStepBtns step={step} setStep={setStep} onSend={sendFunction} />
        )}
      </form>
    </div>
  );
};

export default FormStep;
